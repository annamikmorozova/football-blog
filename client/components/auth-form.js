import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {auth} from "../store";
import {Button, Container, Col, Form, FormGroup} from "react-bootstrap";
import {Label, Input} from "reactstrap";

const AuthForm = props => {
	const {name, displayName, handleSubmit, error} = props;

	return (
		<Container className="App">
			<Form onSubmit={handleSubmit} name={name} className="form">
				<h3>{displayName}</h3>
				{name === "signup" ? (
					<div className="form-centered">
						<Col>
							<FormGroup>
								<Label for="exampleFName" className="label-style">
									Имя
								</Label>
								<Input
									name="firstName"
									type="text"
									className="input-style"
									placeholder="Введите первое имя"
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="exampleLName" className="label-style">
									Фамилия
								</Label>
								<Input
									name="lastName"
									type="text"
									className="form-control input-style"
									placeholder="Введите фамилию"
								/>
							</FormGroup>
						</Col>
					</div>
				) : null}
				<Col>
					<FormGroup>
						<Label for="exampleEmail" className="label-style">
							Имейл
						</Label>
						<Input
							name="email"
							type="text"
							className="form-control input-style"
							placeholder="Введите имейл"
						/>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="examplePassword" className="label-style">
							Пароль
						</Label>
						<Input
							htmlFor="password"
							name="password"
							className="form-control input-style"
							placeholder="**********"
						/>
					</FormGroup>
				</Col>
				<Col>
					<Button variant="dark" type="submit" className="btn button-space">
						{displayName}
					</Button>
				</Col>
				{error && error.response && <div> {error.response.data} </div>}
			</Form>
		</Container>
	);
};

const mapLogin = state => {
	return {
		name: "login",
		displayName: "Login",
		error: state.user.error
	};
};

const mapSignup = state => {
	return {
		name: "signup",
		displayName: "Sign Up",
		error: state.user.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const firstName =
				formName === "signup" ? evt.target.firstName.value : null;
			const lastName = formName === "signup" ? evt.target.lastName.value : null;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			dispatch(auth(email, password, lastName, firstName, formName));
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
