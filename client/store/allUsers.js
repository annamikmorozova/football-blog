import axios from "axios";

const GET_ALL_USERS = "GET_ALL_USERS";

const getAllUsers = users => {
	return {
		type: GET_ALL_USERS,
		users
	};
};

export const fetchUsers = () => async dispatch => {
	try {
		const {data} = await axios.get("/api/admin");
		dispatch(getAllUsers(data));
	} catch (err) {
		console.log(err);
	}
};

export default function allUsersReducer(state = [], action) {
	switch (action.type) {
		case GET_ALL_USERS:
			return [...action.users];
		default:
			return state;
	}
}
