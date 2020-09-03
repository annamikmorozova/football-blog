import React, {Component} from "react";
// import {connect} from "react-redux";
import {Col, Button} from "reactstrap";
import {Form} from "react-bootstrap";

class Comment extends Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		description: "",
	// 	};
	// this.handleInputChange = this.handleInputChange.bind(this);
	// this.handleSubmit = this.handleSubmit.bind(this);
	// }

	// handleSubmit(event) {
	// 	event.preventDefault();
	// 	const form = new FormData();
	// 	form.append("image", this.state.image);
	// 	form.append("title", this.state.title);
	// 	form.append("description", this.state.description);
	// 	this.props.newPostThunk(form);
	// 	this.props.history.push("/posts");
	// }

	// handleInputChange(event) {
	// 	event.preventDefault();
	// 	this.setState({[event.target.name]: event.target.value});
	// }

	render() {
		return (
			<div>
				<Form className="form-style">
					<h1> Add a new comment </h1>

					<div className="col-md-6 form-labels-style">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							name="description"
							className="form-control"
							id="description"
							placeholder="description"
							required=""
							// value={this.state.description}
							// onChange={this.handleInputChange}
						/>
					</div>
					<Button variant="outline-primary" size="md" type="submit">
						Comment
					</Button>
				</Form>
			</div>
		);
	}
}

export default Comment;
