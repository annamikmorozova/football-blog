import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchPosts} from "../store";
import {FcFolder} from "react-icons/fc";

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
					<div className="folder">
						<div className="library-folders">Shinnik 1900</div>
						<FcFolder size={72} />
					</div>

					<div className="folder">
						<div className="library-folders">Shinnik 1800</div>
						<FcFolder size={72} />
					</div>

					<div className="folder">
						<div className="library-folders">Shinnik 1700</div>
						<FcFolder size={72} />
					</div>

					<div className="folder">
						<div className="library-folders">Shinnik 2000</div>
						<FcFolder size={72} />
					</div>
				</div>
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
