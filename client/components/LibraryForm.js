import React, {Component} from "react";
import {Button} from "reactstrap";
import {Form} from "react-bootstrap";

export default class LibraryForm extends Component {
	constructor() {
		super();
		this.state = {
			category: "",
			description: "",
			credits: "",
			image: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const form = new FormData();
		form.append("category", this.state.category);
		form.append("description", this.state.description);
		form.append("credits", this.state.credits);
		form.append("image", this.state.image);
		this.props.newPostThunk(form);
		this.props.history.push("/library");
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({[event.target.name]: event.target.value});
	}

	handleFileChange(event) {
		event.preventDefault();
		this.setState({image: event.target.files[0]});
	}

	render() {
		return (
			<Form className="form-style" onSubmit={this.handleSubmit}>
				<h1> Add a new image to the library</h1>
				<div className="col-md-6 form-labels-style">
					<label className="form-title" htmlFor="category">
						Category
					</label>
					<input
						type="text"
						name="category"
						className="form-control"
						id="category"
						placeholder="Category"
						required=""
						value={this.state.category}
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
					<label htmlFor="credits">Credits</label>
					<input
						type="text"
						name="credits"
						className="form-control"
						id="credits"
						placeholder="Credits"
						required=""
						value={this.state.credits}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="img">Select Image</label>
					<input
						type="file"
						name="image"
						className="form-control"
						id="image"
						accept="image/*"
						placeholder="image"
						required=""
						onChange={this.handleFileChange}
					/>
				</div>

				<Button variant="outline-primary" size="lg" type="submit">
					Create
				</Button>
			</Form>
		);
	}
}
