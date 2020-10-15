import React from "react";
import {Button} from "reactstrap";
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
				<h1> Sign up for Newsletters </h1>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						name="firstName"
						className="form-control"
						id="firstName"
						placeholder="First Name"
						required=""
						value={this.state.firstName}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label className="form-title" htmlFor="lastName">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						className="form-control"
						id="lastName"
						placeholder="Last Name"
						required=""
						value={this.state.lastName}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						className="form-control"
						id="email"
						placeholder="Email"
						required=""
						value={this.state.email}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="agree">Agree to receive emails from us</label>
					<input type="checkbox" required="" />
				</div>

				<Button variant="outline-primary" size="lg" type="submit">
					Create
				</Button>
			</Form>
		);
	}
}
