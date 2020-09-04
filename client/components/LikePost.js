import React, {Component} from "react";
import {FacebookProvider, Like} from "react-facebook";

export default class LikePost extends Component {
	render() {
		return (
			<FacebookProvider appId="123456789">
				<Like
					href="http://localhost:8080/posts/1"
					colorScheme="dark"
					showFaces
					share
				/>
			</FacebookProvider>
		);
	}
}
