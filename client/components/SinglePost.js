import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../store/post";

class SinglePost extends Component {
	componentDidMount() {
		this.props.getSinglePost(this.props.match.params.id);
	}

	render() {
		const {post} = this.props;
		return (
			<div>
				<div>{post.title}</div>
				<div>{post.description}</div>
				<div>{post.date}</div>
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
