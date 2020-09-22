import React, {Component} from "react";
import {FacebookProvider, ShareButton} from "react-facebook";

export default class Example extends Component {
	render() {
		if (this.props.id) {
			return (
				<FacebookProvider appId={process.env.FB_APPID || "123456789"}>
					<ShareButton href={`http://localhost:8080/posts/${this.props.id}`}>
						Share
					</ShareButton>
				</FacebookProvider>
			);
		}
		return "";
	}
}
