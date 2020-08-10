import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {auth} from "../store";
import {Button} from "react-bootstrap";

const AuthForm = props => {
	const {name, displayName, handleSubmit, error} = props;

	return (
		<div className="App">
			<form onSubmit={handleSubmit} name={name} className="form">
				<h3>{name}</h3>
				<div className="form-group">
					<label htmlFor="email" className="label-style">
						<small>Email</small>
					</label>
					<input
						name="email"
						type="text"
						className="form-control input-style"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group">
					<label className="label-style">
						<small>Password</small>
					</label>
					<input
						htmlFor="password"
						className="form-control input-style"
						placeholder="Enter password"
					/>
				</div>
				<div className="form-group password-label">
					<div className="custom-control custom-checkbox">
						<input
							type="checkbox"
							className="custom-control-input"
							id="customCheck1"
						/>
						<label className="custom-control-label" htmlFor="customCheck1">
							Remember me
						</label>
					</div>
				</div>
				<div>
					<Button variant="dark" type="submit" className="btn button-space">
						{displayName}
					</Button>
					<Button variant="dark" href="/auth/google">
						{displayName} with Google
					</Button>
					<p className="forgot-password text-right">
						Forgot <a href="#">password?</a>
					</p>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

const mapLogin = state => {
	return {
		name: "Login",
		displayName: "Login",
		error: state.user.error
	};
};

const mapSignup = state => {
	return {
		name: "Sign up",
		displayName: "Sign Up",
		error: state.user.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			dispatch(auth(email, password, formName));
		}
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
};
