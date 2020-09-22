import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../store/post";
import FacebookComments from "./FacebookComments";
import LikePost from "./LikePost";
import {Badge} from "reactstrap";
import ShareButton from "./ShareButton";
import {HiOutlineShare} from "react-icons/hi";

class SinglePost extends Component {
	componentWillMount() {
		this.props.getSinglePost(this.props.match.params.id);
	}

	render() {
		const {post} = this.props;

		if (!post.tags) {
			return "";
		}

		return (
			<div className="columns-post">
				<div className="single-post">
					<div className="single-post-tag">
						{post.tags.map(tag => (
							<div key={tag.id}>
								<Badge className="tag-text">{tag.text}</Badge>
							</div>
						))}
					</div>
					<div className="single-post-share">
						<HiOutlineShare size={22} />
						<ShareButton />
					</div>
					<div className="single-post-title">{post.title}</div>
					<div className="single-post-date">
						By{" "}
						<a className="author-link" href="/about">
							{" "}
							Mikhail Morozov
						</a>
						| {post.date}
					</div>
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
