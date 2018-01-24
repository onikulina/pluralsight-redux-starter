import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            author: Object.assign({}, this.props.author),
            errors: {},
            saving: false,
            deleting: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.author && nextProps.author.id && nextProps.author.id != this.props.author.id) {
            this.setState({author: Object.assign({}, nextProps.author)});
        }
    }

    updateAuthorState(event) {
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({author: author});
    }

    authorFormValid() {
        let formIsValid = true;
        let errors = {};
        if (this.state.author.firstName.length <= 0) {
            errors.title = 'Please add first name';
            formIsValid = false;
        }
        if (this.state.author.lastName.length <= 0) {
            errors.title = 'Please add last name';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    saveAuthor(event) {
        event.preventDefault();
        if (!this.authorFormValid()) {
            return;
        }
        this.setState({saving: true});
        this.props.actions.saveAuthor(this.state.author)
            .then(() => {
                this.setState({saving: false});
                toastr.success('Author saved');
                this.context.router.push('/authors');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteAuthor(event) {
        event.preventDefault();
        this.setState({deleting: true});
        this.props.actions.deleteAuthor(this.state.author)
            .then(() => {
                this.setState({deleting: false});
                toastr.success(`${this.state.author.firstName} ${this.state.author.lastName} deleted`);
                this.context.router.push('/authors');
            })
            .catch(error => {
                toastr.error(error);
                this.setState({deleting: false});
            });
    }

    render() {
        return (
            <AuthorForm
                onChange={this.updateAuthorState}
                onSave={this.saveAuthor}
                onDelete={this.deleteAuthor}
                author={this.state.author}
                errors={this.state.errors}
                saving={this.state.saving}
                deleting={this.state.deleting}
            />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object,
    actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id;
    let author = { id: '', firstName: '', lastName: '', department: '', phone: '' };
    if (authorId && state.authors.length > 0) {
        author = state.authors.find(auth => auth.id === authorId);
    }
    return {
        author: author,
        actions: PropTypes.object.isRequired
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
