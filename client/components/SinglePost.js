import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../store/post";
import FacebookComments from "./FacebookComments";
import LikePost from "./LikePost";
import {Badge} from "reactstrap";
import {IoMdShareAlt} from "react-icons/io";

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
					<img className="single-post-image" src={`${post.imageName}`} />
					{post.credits ? (
						<div className="credits-tag">Источник фото: {post.credits}</div>
					) : (
						""
					)}
					<div className="single-post-tag">
						{post.tags.map(tag => (
							<div key={tag.id}>
								<Badge className="tag-text">{tag.text}</Badge>
							</div>
						))}
					</div>
					<div className="single-post-title">{post.title}</div>
					<div className="single-post-date">
						<p>
							Статья{" "}
							<a className="author-link" href="/about">
								{" "}
								Михаила Морозова
							</a>
						</p>
						<p className="row-date">
							{post.date.slice(0, 10)}
							<p className="date-format">{post.date.slice(11, 16)}</p>
						</p>
					</div>
					<div className="post-layout">
						<div className="single-post-description">{post.description}</div>
					</div>
				</div>
				<div className="single-post-share">
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
