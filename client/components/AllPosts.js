import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {fetchPosts, deletePostThunk} from "../store/post";
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
				<div className="all-posts-boxes">
					{posts.map(post => (
						<div className="post-box" key={post.id}>
							<img className="posts-images" src={`/${post.imageName}`} />
							<p className="post-font">{post.title}</p>
							<div className="button-explore">
								<Link to={`/posts/${post.id}`}>
									<button className="explore-button" type="submit">
										Explore
									</button>
								</Link>
							</div>
							<Row className="row-all-posts">
								<div className="likes">
									<LikePost id={post.id} />
								</div>
							</Row>
							{this.props.isAdmin ? (
								<Col>
									<div className="button-delete">
										<form onSubmit={event => this.handleDelete(event, post.id)}>
											<button type="submit">Delete</button>
										</form>
									</div>
								</Col>
							) : (
								""
							)}
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
