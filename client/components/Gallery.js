import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchPosts} from "../store";
import {FcFolder} from "react-icons/fc";
import {Container, Row, Col} from "reactstrap";
import axios from "axios";

class Library extends Component {
	componentWillMount() {
		this.props.allPosts();
		axios.get("/api/tags").then(resp => {
			const tagMap = resp.data.reduce((acc, tag) => {
				if (acc.hasOwnProperty(tag.category)) {
					acc[tag.category].push(tag.text);
				} else {
					acc[tag.category] = [tag.text];
				}
				return acc;
			}, {});
			this.setState({tagMap});
		});
	}

	constructor() {
		super();

		this.state = {
			tagMap: {},
			filterTag: null
		};
	}

	render() {
		const {posts} = this.props;
		const shownPosts = posts.filter(post => {
			return (
				!this.state.filterTag ||
				post.tags.some(tag => tag.text === this.state.filterTag)
			);
		});
		return (
			<div>
				<h1 className="library-title">Gallery</h1>
				<Container>
					<Row>
						<Col xs={3}>
							{Object.keys(this.state.tagMap || {}).map(category => (
								<div key={category}>
									<p>{category}</p>
									{this.state.tagMap[category].map(tag => (
										<p
											onClick={() => {
												this.setState({filterTag: tag});
											}}
											key={tag}
										>
											&emsp;{tag}
										</p>
									))}
								</div>
							))}
						</Col>
						<Col className="library-layout">
							{shownPosts.map(post => (
								<div key={post.id}>
									<div>{post.imageTitle}</div>
									<img className="library-images" src={`/${post.imageName}`} />
								</div>
							))}
						</Col>
					</Row>
				</Container>
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
