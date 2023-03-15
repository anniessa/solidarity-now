const postReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_POST':
            return [...state, action.payload];
        case 'ClEAR_POST':
            return [];
        default:
            return state;
    }
}

export default postReducer;