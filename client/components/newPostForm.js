import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import {Form} from "react-bootstrap";
import {getSinglePost, newPostThunk, updatePostThunk} from "../store/post";
import axios from "axios";
import ReactTags from "react-tag-autocomplete";
import {Redirect} from "react-router-dom";
import Modal from "./Modal.js";

class NewPostForm extends Component {
	componentWillMount() {
		if (this.props.match.params.id) {
			this.props.getSinglePost(this.props.match.params.id).then(() => {
				const existingTags = this.props.post.tags.map(item => ({
					id: item.id,
					name: item.text
				}));
				this.setState({...this.props.post, tags: existingTags});
			});
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			image: "",
			imageTitle: "",
			credits: "",
			pictureDescription: "",
			tags: [],
			newCategory: "",
			redirect: false,
			show: false
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.isUpdate = this.isUpdate.bind(this);
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

	showModal() {
		this.setState({show: true});
	}

	hideModal(newTag) {
		if (newTag === undefined) {
			this.setState({
				show: false
			});
		} else {
			this.setState({
				tags: [...this.state.tags, {id: newTag.id, name: newTag.text}],
				show: false
			});
		}
	}

	handleInputChange(event) {
		event.preventDefault();
		this.setState({[event.target.name]: event.target.value});
	}

	isUpdate() {
		return !!this.props.match.params.id;
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
		let form = new FormData();
		form.append("image", this.state.image);
		form.append("title", this.state.title);
		form.append("description", this.state.description);
		form.append("imageTitle", this.state.imageTitle);
		form.append("tags", JSON.stringify(this.state.tags));
		form.append("credits", this.state.credits);
		form.append("pictureDescription", this.state.pictureDescription);
		form.append("newCategory", this.state.newCategory);

		if (this.isUpdate()) {
			this.props.updatePostThunk(this.props.match.params.id, form).then(() =>
				this.setState({
					redirect: true
				})
			);
		} else {
			this.props.newPostThunk(form).then(() =>
				this.setState({
					redirect: true
				})
			);
		}
	}

	handleFileChange(event) {
		event.preventDefault();
		this.setState({image: event.target.files[0]});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={`/posts/${this.props.match.params.id || ""}`} />;
		}

		return (
			<div>
				<Modal show={this.state.show} handleClose={this.hideModal} />
				<Form className="form-style" onSubmit={this.handleSubmit}>
					<h1>{this.isUpdate() ? "Изменить статью" : "Новая статья"}</h1>
					<div className="col-md-6 form-labels-style">
						<label className="form-title" htmlFor="title">
							Название
						</label>
						<input
							type="text"
							name="title"
							className="form-control"
							id="title"
							placeholder="Введите название"
							required=""
							value={this.state.title}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="col-md-6 form-labels-style">
						<label htmlFor="description">Статья</label>
						<textarea
							type="text"
							name="description"
							className="form-control description-blog"
							id="description"
							placeholder="Текст статьи"
							required=""
							value={this.state.description}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="col-md-6 form-labels-style">
						<label htmlFor="imageTitle">Название фото</label>
						<input
							type="text"
							name="imageTitle"
							className="form-control"
							id="imageTitle"
							placeholder="1 короткое предложение"
							required=""
							value={this.state.imageTitle}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="col-md-6 form-labels-style">
						<label htmlFor="img">Выберете фото</label>
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
						<label htmlFor="img">Выбрать тэг</label>
						<ReactTags
							ref={this.reactTags}
							tags={this.state.tags}
							suggestions={this.state.suggestions}
							onDelete={this.onDelete.bind(this)}
							onAddition={this.onAddition.bind(this)}
						/>

						<Button
							onClick={this.showModal}
							className="category-button"
							variant="outline-primary"
							size="sm"
							type="button"
						>
							Новый тэг
						</Button>
					</div>

					<div className="col-md-6 form-labels-style">
						<label htmlFor="credits">Чье фото</label>
						<input
							type="text"
							name="credits"
							className="form-control"
							id="credits"
							placeholder="Кого благодарю за фото"
							required=""
							value={this.state.credits}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="col-md-6 form-labels-style">
						<label htmlFor="pictureDescription">Описание фото</label>
						<input
							type="text"
							name="pictureDescription"
							className="form-control"
							id="pictureDescription"
							placeholder="Описание фото"
							required=""
							value={this.state.pictureDescription}
							onChange={this.handleInputChange}
						/>
					</div>

					<Button variant="outline-primary" size="lg" type="submit">
						{this.isUpdate() ? "Изменить статью" : "Новая статья"}
					</Button>
				</Form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		newPostThunk: data => dispatch(newPostThunk(data)),
		getSinglePost: postId => dispatch(getSinglePost(postId)),
		updatePostThunk: (id, data) => dispatch(updatePostThunk(id, data))
	};
};

const mapStateToProps = state => {
	return {
		post: state.post.singlePost
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
