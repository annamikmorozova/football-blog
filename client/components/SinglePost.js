import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../store/post";
import FacebookComments from "./FacebookComments";
import LikePost from "./LikePost";

class SinglePost extends Component {
	componentWillMount() {
		this.props.getSinglePost(this.props.match.params.id);
	}

	render() {
		const {post} = this.props;

		return (
			<div className="columns-post">
				<div className="single-post">
					<div className="single-post-date">{post.date}</div>
					<div className="single-post-title">{post.title}</div>
					<div className="post-layout">
						<div className="single-post-description">{post.description}</div>
						<img className="single-post-image" src={`/${post.imageName}`} />
					</div>
					<LikePost id={post.id} />
				</div>
				<div className="comment-align">
					<FacebookComments id={post.id} />
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
		getSinglePost: postId => dispatch(getSinglePost(postId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
