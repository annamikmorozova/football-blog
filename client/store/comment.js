import axios from "axios";

const ALL_COMMENTS = "ALL_COMMENTS";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const CREATE_COMMENT = "CREATE_COMMENT";

export const allPostComments = comments => {
	return {
		type: ALL_COMMENTS,
		comments
	};
};

export const deleteComment = commentId => {
	return {
		type: DELETE_COMMENT,
		commentId
	};
};

export const updateComment = updatedComment => {
	return {
		type: UPDATE_COMMENT,
		updatedComment
	};
};

export const createNewComment = comment => {
	return {
		type: CREATE_COMMENT,
		comment
	};
};

export const fetchComments = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get("/api/comments");
			dispatch(allPostComments(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteCommentThunk = (postId, commentId) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/post/${postId}/comments/${commentId}`);
			dispatch(deleteComment(commentId));
		} catch (error) {
			console.log(error);
		}
	};
};

export const newCommentThunk = (postId, data) => {
	return async dispatch => {
		try {
			const {comment} = await axios.post(`/api/posts/${postId}`, data);
			dispatch(createNewComment(comment.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateCommentThunk = (postId, updatedComment) => {
	return async dispatch => {
		try {
			const {comment} = await axios.post(
				`/api/posts/${postId}`,
				updatedComment
			);
			dispatch(updateComment(comment.data));
		} catch (error) {
			console.log(error);
		}
	};
};

const initialState = {
	allComments: [],
	newComment: {}
};

export default function commentReducer(state = initialState, action) {
	switch (action.type) {
		case ALL_COMMENTS:
			return {
				...state,
				allComments: action.comments
			};
		case CREATE_COMMENT:
			return {
				...state,
				newComment: action.comment
			};
		case DELETE_COMMENT:
			return {
				...state,
				allComments: state.allPosts.filter(post => post.id !== action.postId)
			};
		case UPDATE_COMMENT:
			return {
				...state,
				newComment: action.updatedComment
			};
		default:
			return state;
	}
}
