import axios from "axios";

const ALL_POSTS = "ALL_POSTS";
const SINGLE_POST = "GET_POST";
const DELETE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";

export const allPosts = posts => {
	return {
		type: ALL_POSTS,
		posts
	};
};

export const singlePost = post => {
	return {
		type: SINGLE_POST,
		post
	};
};

export const deletePost = postId => {
	return {
		type: DELETE_POST,
		postId
	};
};

export const updatePost = updatedPost => {
	return {
		type: UPDATE_POST,
		updatedPost
	};
};

export const updatePostThunk = (postId, updatedPost) => {
	return async dispatch => {
		try {
			const response = await axios({
				method: "post",
				url: `/api/posts/${postId}`,
				data: updatedPost,
				config: {headers: {"Content-Type": "multipart/form-data"}}
			});
			await axios.get("/api/posts");
			dispatch(updatePost(response.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchPosts = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get("/api/posts");
			dispatch(allPosts(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getSinglePost = postId => {
	return async dispatch => {
		try {
			const {data} = await axios.get(`/api/posts/${postId}`);
			dispatch(singlePost(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deletePostThunk = postId => {
	return async dispatch => {
		try {
			await axios.delete(`/api/posts/${postId}`);
			dispatch(deletePost(postId));
		} catch (error) {
			console.log(error);
		}
	};
};

export const newPostThunk = data => {
	return async dispatch => {
		try {
			await axios({
				method: "post",
				url: "/api/posts",
				data,
				config: {headers: {"Content-Type": "multipart/form-data"}}
			});
			const post = await axios.get("/api/posts");
			dispatch(allPosts(post.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const initialState = {
	allPosts: [],
	singlePost: {}
};

export default function postReducer(state = initialState, action) {
	switch (action.type) {
		case ALL_POSTS:
			return {
				...state,
				allPosts: action.posts
			};
		case SINGLE_POST:
			return {
				...state,
				singlePost: action.post
			};
		case DELETE_POST:
			return {
				...state,
				allPosts: state.allPosts.filter(post => post.id !== action.postId)
			};
		case UPDATE_POST:
			return {
				...state,
				singlePost: action.updatedPost
			};
		default:
			return state;
	}
}
