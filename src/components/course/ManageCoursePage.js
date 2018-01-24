import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false,
            deleting: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.course && nextProps.course.id && nextProps.course.id != this.props.course.id) {
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    courseFormValid() {
        let formIsValid = true;
        let errors = {};
        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();
        if (!this.courseFormValid()) {
            return;
        }
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(() => {
                this.setState({saving: false});
                toastr.success('Coarse saved');
                this.context.router.push('/courses');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteCourse(event) {
        event.preventDefault();
        this.setState({deleting: true});
        this.props.actions.deleteCourse(this.state.course)
            .then(() => {
                this.setState({deleting: false});
                toastr.success(`${this.state.course.title} deleted`);
                this.context.router.push('/courses');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({deleting: false});
            });
    }

    render() {
        return (
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                onDelete={this.deleteCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
                deleting={this.state.deleting}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (courses.length) return course[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }
    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors),
        actions: PropTypes.object.isRequired
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);