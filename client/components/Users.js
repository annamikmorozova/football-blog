import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../store";

class Users extends Component {
	componentWillMount() {
		this.props.fetchUsers();
	}

	render() {
		const {users} = this.props;

		return (
			<div>
				<h1 className="about-title">Users</h1>
				<table>
					<thead className="thead-light">
						<tr>
							<th scope="col">#</th>
							<th scope="col">First</th>
							<th scope="col">Last</th>
							<th scope="col">Email</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<th scope="row">{user.id}</th>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button type="submit">Delete</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.users
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
