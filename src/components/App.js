// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

// functionality to add/ edit/ delete authors
// functionality to delete a course - hide empty course list
// message to user if tries to leave course form with unsaved changes
// client side validation
// handle 404's
// pagination
// sort course table alpha - map state to props
// revert abanoned changes
// check react + flux

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header
					loading={this.props.loading}
				/>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		loading: state.ajaxCallsInProgress > 0
	};
}

export default connect(mapStateToProps)(App);