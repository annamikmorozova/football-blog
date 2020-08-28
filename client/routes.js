import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import {
	Login,
	Signup,
	UserHome,
	AllPosts,
	NewPostForm,
	SinglePost
} from "./components";
import {me} from "./store";

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const {isLoggedIn} = this.props;

		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/posts" component={AllPosts} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/new_post" component={NewPostForm} />
				{/* <Route path="/posts/:id" component={SinglePost} />  */}
				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route path="/home" component={UserHome} />
					</Switch>
				)}
				{/* Displays our Login component as a fallback */}
				<Route component={Login} />
			</Switch>
		);
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
