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
			image: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.newPostThunk(this.state);
		this.props.history.push("/posts");
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<div> Add a new post</div>
				<div className="col-md-6 mb-3">
					<label htmlFor="title">Title</label>
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

				<div className="col-md-6 mb-3">
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

				<div className="col-md-6 mb-3">
					<label htmlFor="image">Image</label>
					<input
						type="text"
						name="image"
						className="form-control"
						id="image"
						placeholder="image"
						required=""
						value={this.state.image}
						onChange={this.handleInputChange}
					/>
				</div>

				<Button size="lg" type="submit">
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
