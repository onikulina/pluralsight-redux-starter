import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListRow = ({ authors, course }) => {
    let row = null;
    if (authors.length) {
        const author = authors.find(auth => auth.id === course.authorId);
        row = (
            <tr>
                <td><a href={course.watchHref} target="_blank">Watch</a></td>
                <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
                <td>{`${author.firstName} ${author.lastName}`}</td>
                <td>{course.category}</td>
                <td>{course.length}</td>
            </tr>
        );
    }
    return row;
};

CourseListRow.propTypes = {
    authors: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired
};

export default CourseListRow;
