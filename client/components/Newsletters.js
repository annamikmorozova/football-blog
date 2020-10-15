import React from "react";
import {Form} from "react-bootstrap";
import axios from "axios";
import {Redirect} from "react-router-dom";

export default class Newsletters extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			redirect: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				this.state.email
			)
		) {
			alert("You have entered an invalid email address!");
		} else {
			await axios.post("/api/admin/users", this.state);
			this.setState({
				redirect: true
			});
		}
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/submitted" />;
		}

		return (
			<Form className="form-style" onSubmit={this.handleSubmit}>
				<h1 className="newsletter"> Подисаться на новости </h1>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="firstName">Имя</label>
					<input
						type="text"
						name="firstName"
						className="form-control"
						id="firstName"
						placeholder="Введите Ваше имя"
						required=""
						value={this.state.firstName}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label className="form-title" htmlFor="lastName">
						Фамилия
					</label>
					<input
						type="text"
						name="lastName"
						className="form-control"
						id="lastName"
						placeholder="Введите Вашу фамилию"
						required=""
						value={this.state.lastName}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="email">Имейл</label>
					<input
						type="text"
						name="email"
						className="form-control"
						id="email"
						placeholder="Введите имейл"
						required=""
						value={this.state.email}
						onChange={this.handleInputChange}
					/>
				</div>

				<button className="btn-3" type="submit">
					Подисаться
				</button>
			</Form>
		);
	}
}
