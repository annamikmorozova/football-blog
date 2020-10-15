import React from "react";
import {Link} from "react-router-dom";

export default class AdminDashboard extends React.Component {
	render() {
		return (
			<div className="admin-dashboard">
				<Link to="/new_post">
					<button type="button" className="admin-options">
						Make a post
					</button>
				</Link>
				<Link to="/posts">
					<button href="posts" type="button" className="admin-options-2">
						Manage Posts
					</button>
				</Link>
			</div>
		);
	}
}
