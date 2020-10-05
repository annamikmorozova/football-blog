import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout, fetchPosts} from "../store";
import {Row, Col} from "react-bootstrap";

class MainNavbar extends React.Component {
	componentDidMount() {
		this.props.allPosts();
	}

	render() {
		return (
			<div className="navbar-container">
				<img src="/header7.png" alt="header" className="header-image" />
				<Col className="navbar-title-and-menu">
					{this.props.isLoggedIn ? (
						<div className="navbar-text">
							<h1 className="website-name">MKM Football</h1>
							<Row className="navbar-row">
								<Link className="nav-admin-color" to="/home">
									Admin
								</Link>
								<Link className="nav-admin-color" to="/about">
									About
								</Link>
								<Link className="nav-admin-color" to="/posts">
									Posts
								</Link>
								<Link className="nav-admin-color" to="/gallery">
									Gallery
								</Link>

								<a
									className="nav-admin-color"
									href="/posts"
									onClick={this.props.handleClick}
								>
									Logout
								</a>
							</Row>
						</div>
					) : (
						<div className="navbar-text">
							<h1 className="website-name">MKM76</h1>
							<Row className="navbar-row">
								<Link className="nav-admin-color" to="/about">
									About
								</Link>

								<Link className="nav-admin-color" to="/posts">
									Posts
								</Link>

								<Link className="nav-admin-color" to="/gallery">
									Gallery
								</Link>
							</Row>
						</div>
					)}
				</Col>
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
		},
		allPosts() {
			dispatch(fetchPosts());
		}
	};
};

MainNavbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatch)(MainNavbar);
