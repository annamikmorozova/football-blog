import React, {Component} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";
import {Col} from "reactstrap";
import {fetchPosts} from "../store/post";

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
							<p>image</p>
						</Col>
						<Col xs={9}>
							<p>{post.title}</p>
							<p>{post.description}</p>
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
