import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Row, Badge, Button} from "reactstrap";
import {fetchPosts, deletePostThunk} from "../store/post";

class AllPosts extends React.Component {
	constructor() {
		super();
		this.state = {
			tagMap: {},
			filterTag: null
		};
		this.handleDelete = this.handleDelete.bind(this);
	}

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

	handleDelete(event, id) {
		event.preventDefault();
		this.props.deletePostThunk(id);
	}

	render() {
		const {posts} = this.props;
		const shownPosts = posts.filter(post => {
			return (
				!this.state.filterTag ||
				post.tags.some(tag => tag.text === this.state.filterTag)
			);
		});

		let sortedPosts = shownPosts
			.sort((a, b) => {
				return new Date(a.data).getTime() - new Date(b.date).getTime();
			})
			.reverse();

		return (
			<div>
				<div className="posts-tags">
					<div
						className="see-all"
						onClick={() => {
							this.setState({filterTag: null});
						}}
					>
						ВCE
					</div>
					{Object.keys(this.state.tagMap || {}).map(category => (
						<div className="posts-category" key={category}>
							<p className="category-font-2">{category}:</p>
							{this.state.tagMap[category].map((tag, i) => (
								<p
									className="tags-font-2"
									onClick={() => {
										this.setState({filterTag: tag});
									}}
									key={tag}
								>
									{i !== 0 ? "|" : ""} &emsp;{tag}
								</p>
							))}
						</div>
					))}
				</div>

				<div className="all-posts-boxes">
					{sortedPosts.map(post => (
						<div className="post-box" key={post.id}>
							<Link to={`/posts/${post.id}`}>
								<img className="posts-images" src={`${post.imageName}`} />
							</Link>
							<Row className="tags-all-posts">
								{post.tags.map(tag => (
									<Badge className="each-tag" variant="primary" key={tag.id}>
										{tag.text}
									</Badge>
								))}
							</Row>
							<p className="post-font">{post.title}</p>
							<div className="buttons-align">
								<Row>
									{this.props.isAdmin ? (
										<Col>
											<div className="button-delete">
												<form
													onSubmit={event => this.handleDelete(event, post.id)}
												>
													<Button color="danger" type="submit">
														Удалить
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
													<Link to={`/update-post/${post.id}`}>
														<Button color="warning" type="submit">
															Отредактировать
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
