import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

export class AllPosts extends Component {
	//   constructor() {
	//     super();
	//   }
	//   componentDidMount() {
	//     this.props.allPosts();
	//   }

	render() {
		// const {posts} = this.props;

		return <div>Hi</div>;
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
