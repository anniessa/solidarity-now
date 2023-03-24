import {combineReducers} from 'redux';

// const files = (state = {}, action) => {
//     switch(action.type) {
//         case 'SET_FILES':
//             return action.payload;
//         default:
//             return state;
//     }
// }

const profilePicture = (state = '', action) => {
    switch(action.type) {
        case 'SET_UPLOADS':
            return action.payload;
        default:
            return state;
    }
}


const imageReducer = combineReducers({
    // files,
    profilePicture
})

export default imageReducer;