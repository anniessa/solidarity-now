function tagsPostsReducer(state = [], action) {
	switch (action.type) {
		case "SET_TAG_RELATIONS":
			return action.payload;
		case "CLEAR_TAG_RELATIONS":
			return action.payload;
		default:
			return state;
	}
}

export default tagsPostsReducer;