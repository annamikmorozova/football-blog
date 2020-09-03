import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../store";
import {Table} from "react-bootstrap";

class Users extends Component {
	componentWillMount() {
		this.props.fetchUsers();
	}

	render() {
		const {users} = this.props;

		return (
			<div>
				<h1 className="about-title">Users</h1>
				<Table>
					<thead className="thead-light">
						<tr>
							<th scope="col">#</th>
							<th scope="col">First Name</th>
							<th scope="col">Last Name</th>
							<th scope="col">Role</th>
							<th scope="col">Email</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr className="users-rows" key={user.id}>
								<th scope="row">{user.id}</th>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.role}</td>
								<td>{user.email}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.allUsers
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
