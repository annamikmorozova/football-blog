import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout, fetchPosts} from "../store";

class MainNavbar extends React.Component {
	componentDidMount() {
		this.props.allPosts();
	}

	render() {
		return (
			<nav className="nav">
				<NavLink to="/posts" className="nav__title">
					MKM Football
				</NavLink>

				{this.props.isLoggedIn ? (
					<div className="nav__list">
						<NavLink
							activeClassName="active"
							className="nav__item grow"
							to="/home"
						>
							Админ
						</NavLink>
						<NavLink className="nav__item grow" to="/about">
							Главная
						</NavLink>
						<NavLink className="nav__item grow" to="/posts">
							Статьи
						</NavLink>
						<NavLink className="nav__item grow" to="/gallery">
							Галерея
						</NavLink>
						<a
							className="nav__item grow"
							href="/posts"
							onClick={this.props.handleClick}
						>
							Выйти
						</a>
					</div>
				) : (
					<div className="nav__list">
						<NavLink
							activeClassName="active"
							className="nav__item grow"
							to="/about"
						>
							Главная
						</NavLink>
						<NavLink className="nav__item grow" to="/posts">
							Статьи
						</NavLink>
						<NavLink className="nav__item grow" to="/gallery">
							Галерея
						</NavLink>
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
