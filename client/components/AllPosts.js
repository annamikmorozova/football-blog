import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {fetchPosts, deletePostThunk} from "../store/post";
import {BsHeartFill} from "react-icons/bs";
import LikePost from "./LikePost";

class AllPosts extends Component {
	constructor() {
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount() {
		this.props.allPosts();
	}

	handleDelete(event, id) {
		event.preventDefault();
		this.props.deletePostThunk(id);
	}

	render() {
		const {posts} = this.props;

		return (
			<div>
				{posts.map(post => (
					<div className="post-row" key={post.id}>
						<Col xs={3}>
							<img className="posts-images" src={`/${post.imageName}`} />
						</Col>
						<Col xs={7}>
							<Link to={`/posts/${post.id}`}>
								<p className="post-font">{post.title}</p>
								<p className="post-text">{post.shortcut}</p>
							</Link>
							<Row className="row-all-posts">
								<div className="comments-all-posts">Comments</div>
								<BsHeartFill />
								<LikePost id={post.id} />
							</Row>
						</Col>
						{this.props.isAdmin ? (
							<Col>
								<form onSubmit={event => this.handleDelete(event, post.id)}>
									<button type="submit">Delete</button>
								</form>
							</Col>
						) : (
							""
						)}
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.post.allPosts,
		isAdmin: state.user.role === "admin"
	};
};

const mapDispatchToProps = dispatch => {
	return {
		allPosts: () => dispatch(fetchPosts()),
		deletePostThunk: id => dispatch(deletePostThunk(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
