import React, {Component} from "react";
import {FacebookProvider, Comments} from "react-facebook";

export default class FacebookComments extends Component {
	componentDidMount() {
		FB.XFBML.parse();

		window.fbAsyncInit = function() {
			FB.init({
				appId: process.env.FB_APPID,
				cookie: true, // enable cookies to allow the server to access the session
				xfbml: true, // parse social plugins on this page
				version: "v2.5" // use version 2.1
			});
		};

		// Load the SDK asynchronously
		(function(d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, "script", "facebook-jssdk");
	}

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
