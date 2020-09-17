import React from "react";
import {Button} from "reactstrap";
import {Form} from "react-bootstrap";
import axios from "axios";

export default class Newsletters extends React.Component {
	constructor() {
		super();
		this.state = {
			fullName: "",
			email: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		await axios.post("/api/users", this.state);
		this.setState({
			redirect: true
		});
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		return (
			<Form className="form-style" onSubmit={this.handleSubmit}>
				<h1> Add a new post </h1>
				<div className="col-md-6 form-labels-style">
					<label className="form-title" htmlFor="fullName">
						Full Name
					</label>
					<input
						type="text"
						name="fullName"
						className="form-control"
						id="fullName"
						placeholder="Full Name"
						required=""
						value={this.state.fullName}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						name="description"
						className="form-control"
						id="description"
						placeholder="description"
						required=""
						value={this.state.description}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="pictureDescription">Email</label>
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

				<Button variant="outline-primary" size="lg" type="submit">
					Create
				</Button>
			</Form>
		);
	}
}
