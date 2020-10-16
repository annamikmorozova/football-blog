import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {IoLogoFacebook} from "react-icons/io";
import {TiSocialInstagram} from "react-icons/ti";
import {HiOutlineMail} from "react-icons/hi";

class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<div className="footer-col">
					<div className="footer-inside-col">
						<div className="footer-text">MKM Football</div>
						<p className="footer-description">
							На этой странице пишу о футболе, о людях, связанных с историей
							футбольного клуба «Шинник».
						</p>
					</div>

					<div className="footer-inside-col">
						<div className="footer-text">Ресурсы</div>
						{this.props.isLoggedIn ? (
							<a className="admin-login" href="/home">
								Администратор
							</a>
						) : (
							<a className="admin-login" href="/login">
								Администратор
							</a>
						)}
						<a className="signup-newsletters" href="/newletters">
							Подписаться на новости
						</a>
						<a
							className="signup-newsletters"
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:m.k.morozov@gmail.com"
						>
							Контакт информация
						</a>
					</div>
				</div>
				<div className="social-media">
					<a
						href="https://www.instagram.com/mkmfootball"
						target="_blank"
						rel="noopener noreferrer"
					>
						<TiSocialInstagram color="white" size={22} />
					</a>
					<a
						href="https://www.facebook.com/mkmfootball"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IoLogoFacebook color="white" size={22} />
					</a>
					<a
						href="mailto:m.k.morozov@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<HiOutlineMail color="white" size={22} />
					</a>
				</div>
				<div className="github-and-developers">
					<div className="designed-by">
						Designed by Anna Morozova and Erik Yeomans
					</div>
					<a
						className="github"
						href="https://github.com/annamikmorozova/football-blog"
						target="_blank"
						rel="noopener noreferrer"
					>
						Github
					</a>
				</div>
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

Footer.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Footer);
