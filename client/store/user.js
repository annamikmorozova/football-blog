import axios from "axios";
import history from "../history";

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const ALL_USERS = "ALL_USERS";

const defaultUser = {};

const getUser = user => ({
	type: GET_USER,
	user
});

const removeUser = () => ({
	type: REMOVE_USER
});

const getAllUsers = users => ({
	type: ALL_USERS,
	users
});

export const me = () => async dispatch => {
	try {
		const res = await axios.get("/auth/me");
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

export const auth = (
	email,
	password,
	lastName,
	firstName,
	method
) => async dispatch => {
	let res;
	try {
		res = await axios.post(`/auth/${method}`, {
			email,
			password,
			lastName,
			firstName
		});
	} catch (authError) {
		return dispatch(getUser({error: authError}));
	}

	try {
		dispatch(getUser(res.data));
		history.push("/home");
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.post("/auth/logout");
		dispatch(removeUser());
		history.push("/login");
	} catch (err) {
		console.error(err);
	}
};

export const fetchUsers = () => async dispatch => {
	try {
		const {data} = await axios.get("api/admin");
		console.log(data);
		dispatch(getAllUsers(data));
	} catch (err) {
		console.log(err);
	}
};

export default function(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case ALL_USERS:
			return [...action.users];
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
