import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {fetchPosts} from "../store/post";
import {BsHeartFill} from "react-icons/bs";

class AllPosts extends Component {
	componentWillMount() {
		this.props.allPosts();
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
						<Col xs={9}>
							<Link to={`/posts/${post.id}`}>
								<p>{post.title}</p>
								<p>{post.description}</p>
							</Link>
							<Row className="row-all-posts">
								<div className="comments-all-posts">Comments</div>
								<BsHeartFill />
							</Row>
						</Col>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: state.post.allPosts
	};
};

const mapDispatchToProps = dispatch => {
	return {
		allPosts: () => dispatch(fetchPosts())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
