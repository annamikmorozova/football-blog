import React, {Component} from "react";
import {FacebookProvider, Comments} from "react-facebook";

export default class FacebookComments extends Component {
	render() {
		return (
			<FacebookProvider appId="123456789">
				<Comments href="http://localhost:8080/posts" />
			</FacebookProvider>
		);
	}
}
