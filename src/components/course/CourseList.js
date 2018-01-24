import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({ authors, courses }) => {
	// courses = courses.sort(sortByName);
	return (
		<table className="table">
			<thead>
				<tr>
					<th>&nbsp;</th>
					<th>Title</th>
					<th>Author</th>
					<th>Category</th>
					<th>Length</th>
				</tr>
			</thead>
			<tbody>
				{courses.map(course =>
					<CourseListRow key={course.id} course={course} authors={authors} />
				)}
			</tbody>
		</table>
	);
};

CourseList.propTypes = {
	authors: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired
};

export default CourseList;
