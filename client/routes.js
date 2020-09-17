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
	SinglePost,
	About,
	Gallery,
	Users,
	Newsletters
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
				<Route exact path="/posts" component={AllPosts} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/new_post" component={NewPostForm} />
				<Route path="/about" component={About} />
				<Route path="/gallery" component={Gallery} />
				<Route path="/posts/:id" component={SinglePost} />
				<Route path="/users" component={Users} />
				<Route path="/newletters" component={Newsletters} />
				{isLoggedIn && (
					<Switch>
						<Route path="/home" component={UserHome} />
					</Switch>
				)}
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
