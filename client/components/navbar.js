import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../store";
import {IoIosFootball} from "react-icons/io";
import {Navbar, Row, Col} from "react-bootstrap";

class MainNavbar extends React.Component {
	render() {
		return (
			<div>
				<Navbar className="navbar-style" expand="lg">
					<Col className="navbar-title-and-menu">
						{this.props.isLoggedIn ? (
							<div>
								<h1 className="website-name">FOOTBALL BLOG RU</h1>
								<Row className="navbar-row">
									<Link to="/">About</Link>
									<Link to="#">Posts</Link>
									<Link to="#">Library</Link>
									{this.props.isAdmin ? <Link to="/users">Users</Link> : ""}
									{this.props.isAdmin ? (
										<Link to="/new-post">Make a post</Link>
									) : (
										""
									)}
									<Link className="posts-navbar-link" to="/cart">
										{" "}
										<IoIosFootball color="white" size={38} />
									</Link>
									<a href="#" onClick={this.props.handleClick}>
										Logout
									</a>
								</Row>
							</div>
						) : (
							<div className="navbar-text">
								<h1 className="website-name">FOOTBALL BLOG RU</h1>
								<Row className="navbar-row">
									<Link to="#">About</Link>
									<Link to="#">Posts</Link>
									<Link to="#">Library</Link>
									<Link className="posts-navbar-link" to="#">
										{" "}
										<IoIosFootball color="white" size={38} />
									</Link>
									<Link to="/login">Login</Link>
									<Link to="/signup">Sign Up</Link>
								</Row>
							</div>
						)}
					</Col>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: !!state.user.id,
		isAdmin: state.user.role === "admin"
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapStateToProps, mapDispatch)(MainNavbar);

MainNavbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
