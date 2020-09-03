import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import {Form} from "react-bootstrap";
import {newPostThunk} from "../store/post";

class NewPostForm extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			description: "",
			image: "",
			shortcut: "",
			imageTitle: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const form = new FormData();
		form.append("image", this.state.image);
		form.append("title", this.state.title);
		form.append("description", this.state.description);
		form.append("imageTitle", this.state.imageTitle);
		form.append("shortcut", this.state.shortcut);
		this.props.newPostThunk(form);
		this.props.history.push("/posts");
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
				<h1> Add a new post </h1>
				<div className="col-md-6 form-labels-style">
					<label className="form-title" htmlFor="title">
						Title
					</label>
					<input
						type="text"
						name="title"
						className="form-control"
						id="title"
						placeholder="Title"
						required=""
						value={this.state.title}
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
					<label htmlFor="shortcut">Shortcut</label>
					<input
						type="text"
						name="shortcut"
						className="form-control"
						id="shortcut"
						placeholder="shortcut"
						required=""
						value={this.state.shortcut}
						onChange={this.handleInputChange}
					/>
				</div>

				<div className="col-md-6 form-labels-style">
					<label htmlFor="imageTitle">Image title</label>
					<input
						type="text"
						name="imageTitle"
						className="form-control"
						id="imageTitle"
						placeholder="image title"
						required=""
						value={this.state.imageTitle}
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

const mapDispatchToProps = dispatch => {
	return {
		newPostThunk: data => dispatch(newPostThunk(data))
	};
};

export default connect(null, mapDispatchToProps)(NewPostForm);
