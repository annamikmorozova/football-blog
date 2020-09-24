import React, {Component} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../store/post";
import FacebookComments from "./FacebookComments";
import LikePost from "./LikePost";
import {Badge} from "reactstrap";
import ShareButton from "./ShareButton";
import {HiOutlineShare} from "react-icons/hi";
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
					<div className="single-post-tag">
						{post.tags.map(tag => (
							<div key={tag.id}>
								<Badge className="tag-text">{tag.text}</Badge>
							</div>
						))}
					</div>
					<div className="single-post-share">
						<div>Share</div>
						<IoMdShareAlt size={22} />
						<HiOutlineShare size={22} />
						<ShareButton />
						<a
							href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://localhost:8080/posts."
							title="Share by Email"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								className="share-image"
								src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"
							/>
						</a>
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
