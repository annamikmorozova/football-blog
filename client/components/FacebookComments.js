import React, {Component} from "react";
import {FacebookProvider, Comments} from "react-facebook";

export default class FacebookComments extends Component {
	render() {
		if (this.props.id) {
			return (
				<FacebookProvider appId={process.env.FB_APPID || "123456789"}>
					<Comments
						className="comment-align"
						href={`http://localhost:8080/posts/${this.props.id}`}
					/>
				</FacebookProvider>
			);
		}
		return "";
	}
}
