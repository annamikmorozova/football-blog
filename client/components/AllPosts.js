import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row, Badge} from "reactstrap";
import {fetchPosts, deletePostThunk} from "../store/post";
import LikePost from "./LikePost";
import updatePost from "./updatePost";

class AllPosts extends React.Component {
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
				<div className="all-posts-boxes">
					{posts.map(post => (
						<div className="post-box" key={post.id}>
							<img className="posts-images" src={`/${post.imageName}`} />
							<p className="post-font">{post.title}</p>
							<div className="button-explore">
								<Link to={`/posts/${post.id}`}>
									<button className="explore-button" type="submit">
										Read more
									</button>
								</Link>
							</div>
							<Row className="row-all-posts">
								<div className="likes">
									<LikePost id={post.id} />
								</div>
							</Row>
							<Row>
								{this.props.isAdmin ? (
									<Col>
										<div className="button-delete">
											<form
												onSubmit={event => this.handleDelete(event, post.id)}
											>
												<button type="submit">Delete</button>
											</form>
										</div>
									</Col>
								) : (
									""
								)}
								{this.props.isAdmin ? (
									<Col>
										<div className="button-update">
											<form>
												<Link to="/update-post">
													<button type="submit">Update</button>
												</Link>
											</form>
										</div>
									</Col>
								) : (
									""
								)}
							</Row>
							<Row>
								{post.tags.map(tag => (
									<Badge variant="primary" key={tag.id}>
										{tag.text}
									</Badge>
								))}
							</Row>
						</div>
					))}
				</div>
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
