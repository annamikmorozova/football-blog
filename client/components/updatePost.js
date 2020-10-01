import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost, updatePostThunk} from "../store/post";

class UpdatePost extends Component {
	componentWillMount() {
		this.props.getSinglePost(this.props.match.params.id);
	}

	handleUpdate(id) {
		event.preventDefault();
		this.props.updatePostThunk(id);
	}

	render() {
		const {post} = this.props;

		if (!post.tags) {
			return "";
		}

		return (
			<div className="columns-post">
				<div className="single-post-tag">
					{post.tags.map(tag => (
						<div key={tag.id}>
							<div className="tag-text">{tag.text}</div>
						</div>
					))}
				</div>
				<div className="single-post">
					<div className="single-post-date">{post.date}</div>
					<div className="single-post-title">{post.title}</div>
					<div className="post-layout">
						<div className="single-post-description">{post.description}</div>
						<img className="single-post-image" src={`/${post.imageName}`} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		post: state.post.singlePost
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getSinglePost: postId => dispatch(getSinglePost(postId)),
		updatePostThunk: id => dispatch(updatePostThunk(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);
