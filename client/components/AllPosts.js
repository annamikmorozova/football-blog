import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row, Badge, Button} from "reactstrap";
import {fetchPosts, deletePostThunk} from "../store/post";
import LikePost from "./LikePost";

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
							<Row className="tags-all-posts">
								{post.tags.map(tag => (
									<Badge className="each-tag" variant="primary" key={tag.id}>
										{tag.text}
									</Badge>
								))}
							</Row>
							<p className="post-font">{post.title}</p>
							<div className="button-explore">
								<Link to={`/posts/${post.id}`}>
									<Button
										color="secondary"
										className="explore-button"
										type="submit"
									>
										Read more
									</Button>
								</Link>
							</div>
							<Row className="row-all-posts">
								<div className="likes">
									<LikePost id={post.id} />
								</div>
							</Row>
							<div className="buttons-align">
								<Row>
									{this.props.isAdmin ? (
										<Col>
											<div className="button-delete">
												<form
													onSubmit={event => this.handleDelete(event, post.id)}
												>
													<Button color="danger" type="submit">
														Delete
													</Button>
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
														<Button color="warning" type="submit">
															Update
														</Button>
													</Link>
												</form>
											</div>
										</Col>
									) : (
										""
									)}
								</Row>
							</div>
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
