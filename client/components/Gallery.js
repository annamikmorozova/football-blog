import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchPosts} from "../store";
import {Container, Row, Col} from "reactstrap";
import axios from "axios";
import {Lightbox} from "react-modal-image";

class Library extends Component {
	componentWillMount() {
		this.props.allPosts().then(() => {
			const tagMap = {};
			this.props.posts.forEach(post => {
				post.tags.reduce((acc, tag) => {
					if (
						acc.hasOwnProperty(tag.category) &&
						!acc[tag.category].includes(tag.text)
					) {
						acc[tag.category].push(tag.text);
					} else if (!acc.hasOwnProperty(tag.category)) {
						acc[tag.category] = [tag.text];
					}
					return acc;
				}, tagMap);
			});
			this.setState({tagMap});
		});
	}

	constructor() {
		super();

		this.state = {
			tagMap: {},
			filterTag: null,
			modalImage: null,
			modalDescription: null
		};
		this.closeLightbox = this.closeLightbox.bind(this);
	}

	closeLightbox() {
		this.setState({modalImage: null});
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
				<h1 className="library-title">Галерея</h1>
				{this.state.modalImage !== null ? (
					<Lightbox
						large={this.state.modalImage}
						onClose={this.closeLightbox}
						alt={this.state.modalDescription}
					/>
				) : (
					""
				)}

				<Container>
					<Row className="gallery-grid">
						<Col xs={3}>
							<div
								className="see-all"
								onClick={() => {
									this.setState({filterTag: null});
								}}
							>
								ВCE
							</div>
							{Object.keys(this.state.tagMap || {}).map(category => (
								<div key={category}>
									<p className="category-font">{category}</p>
									{this.state.tagMap[category].map(tag => (
										<p
											className="tags-font"
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
								<div className="image-margin" key={post.id}>
									<div className="image-title-gallery">{post.imageTitle}</div>
									<img
										onClick={() => {
											this.setState({
												modalImage: `${post.imageName}`,
												modalDescription: post.pictureDescription
											});
										}}
										className="library-images"
										src={`${post.imageName}`}
									/>
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
