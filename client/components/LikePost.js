import React, {Component} from "react";
import {FacebookProvider, Like} from "react-facebook";

export default class LikePost extends Component {
	render() {
		if (this.props.id) {
			return (
				<FacebookProvider appId={process.env.FB_APPID || "123456789"}>
					<Like
						href={`http://localhost:8080/posts/${this.props.id}`}
						colorScheme="dark"
						showFaces
						share
					/>
				</FacebookProvider>
			);
		}
		return "";
	}
}
