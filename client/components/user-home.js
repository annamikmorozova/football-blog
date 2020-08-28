import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

export const UserHome = props => {
	const {firstName} = props;

	return (
		<div>
			<h3>Welcome, {firstName}</h3>
		</div>
	);
};

const mapState = state => {
	return {
		firstName: state.user.firstName
	};
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
	firstName: PropTypes.string
};
