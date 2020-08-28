import React, {Component} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";
// import {Button} from "reactstrap";
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
						<div className="post-column">
							<p>{post.title}</p>
							<p>{post.description}</p>
						</div>
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
