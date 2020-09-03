import React, {Component} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";
// import {Col} from "reactstrap";
import {fetchPosts} from "../store";

class Library extends Component {
	componentWillMount() {
		this.props.allPosts();
	}

	render() {
		const {posts} = this.props;
		return (
			<div>
				<h1 className="library-title">Library</h1>
				<div className="library-layout">
					{posts.map(post => (
						<div key={post.id}>
							<div>{post.imageTitle}</div>
							<img className="library-images" src={`/${post.imageName}`} />
						</div>
					))}
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Library);
