import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AdminDashboard} from ".";
import {GrEmoji} from "react-icons/gr";

export const UserHome = props => {
	const {firstName} = props;

	return (
		<div>
			<h3 className="welcome-admin">
				Привет, {firstName} <GrEmoji />
			</h3>

			<AdminDashboard />
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
