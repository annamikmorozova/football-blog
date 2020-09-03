import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../store/post";
import Comment from "./Comment";

class SinglePost extends Component {
	componentDidMount() {
		this.props.getSinglePost(this.props.match.params.id);
	}

	render() {
		const {post} = this.props;
		return (
			<div className="columns-post">
				<div className="single-post">
					<div className="single-post-date">{post.date}</div>
					<div className="single-post-title">{post.title}</div>
					<div className="single-post-description">{post.description}</div>
				</div>
				{/* <div>
					<div className="single-post-description">{post.imageName}</div>
				</div> */}
				<Comment />
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
