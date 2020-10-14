import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout, fetchPosts} from "../store";
import {Row, Col} from "react-bootstrap";
import {Navbar} from "reactstrap";

class MainNavbar extends React.Component {
	componentDidMount() {
		this.props.allPosts();
	}

	render() {
		return (
			<nav className="nav">
				<div className="nav__title">MKM Football</div>

				{this.props.isLoggedIn ? (
					<div className="nav__list">
						<Link className="nav__item" to="/home">
							Admin
						</Link>
						<Link className="nav__item" to="/about">
							About
						</Link>
						<Link className="nav__item" to="/posts">
							Posts
						</Link>
						<Link className="nav__item" to="/gallery">
							Gallery
						</Link>
						<Link
							className="nav__item"
							href="/posts"
							onClick={this.props.handleClick}
						>
							Logout
						</Link>
					</div>
				) : (
					<div className="nav__list">
						<Link className="nav__item" to="/about">
							About
						</Link>
						<Link className="nav__item" to="/posts">
							Posts
						</Link>
						<Link className="nav__item" to="/gallery">
							Gallery
						</Link>
					</div>
				)}
			</nav>
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
