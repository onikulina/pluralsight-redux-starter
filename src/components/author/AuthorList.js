import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorList = ({ authors }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Name</th>
                    <th>Department</th>
                    <th>Office Phone</th>
				</tr>
			</thead>
			<tbody>
				{authors.map((author, i) =>
					<tr key={i}>
                        <td><Link to={'/author/' + author.id}>{`${author.firstName} ${author.lastName}`}</Link></td>
                        <td>{author.department}</td>
                        <td>{author.phone}</td>
                    </tr>
				)}
			</tbody>
		</table>
	);
};

AuthorList.propTypes = {
	authors: PropTypes.array.isRequired
};

export default AuthorList;
