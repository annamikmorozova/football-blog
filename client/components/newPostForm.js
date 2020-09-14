import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import {Form} from "react-bootstrap";
import {newPostThunk} from "../store/post";
import axios from "axios";
import ReactTags from "react-tag-autocomplete";

class NewPostForm extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			description: "",
			image: "",
			shortcut: "",
			imageTitle: "",
			tag: "",
			credits: "",
			pictureDescription: "",
			tags: []
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		axios.get("/api/tags").then(tags => {
			const suggestions = tags.data.map(tagObj => {
				return {
					id: tagObj.id,
					name: tagObj.text
				};
			});
			this.setState({suggestions});
		});
		this.reactTags = React.createRef();
	}

	onDelete(i) {
		const tags = this.state.tags.slice(0);
		tags.splice(i, 1);
		this.setState({tags});
	}

	onAddition(tag) {
		const tags = [].concat(this.state.tags, tag);
		this.setState({tags});
	}

	handleSubmit(event) {
		event.preventDefault();
		const form = new FormData();
		form.append("image", this.state.image);
		form.append("title", this.state.title);
		form.append("description", this.state.description);
		form.append("imageTitle", this.state.imageTitle);
		form.append("shortcut", this.state.shortcut);
		form.append("tag", this.state.tag);
		form.append("credits", this.state.credits);
		form.append("pictureDescription", this.state.pictureDescription);
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

				<div className="col-md-6 form-labels-style">
					<label htmlFor="img">Select Tags</label>
					<ReactTags
						ref={this.reactTags}
						tags={this.state.tags}
						suggestions={this.state.suggestions}
						onDelete={this.onDelete.bind(this)}
						onAddition={this.onAddition.bind(this)}
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
					<label htmlFor="pictureDescription">Picture Description</label>
					<input
						type="text"
						name="pictureDescription"
						className="form-control"
						id="pictureDescription"
						placeholder="Picture Description"
						required=""
						value={this.state.pictureDescription}
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

const mapDispatchToProps = dispatch => {
	return {
		newPostThunk: data => dispatch(newPostThunk(data))
	};
};

export default connect(null, mapDispatchToProps)(NewPostForm);
