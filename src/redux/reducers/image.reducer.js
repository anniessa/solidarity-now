import {combineReducers} from 'redux';

// const files = (state = {}, action) => {
//     switch(action.type) {
//         case 'SET_FILES':
//             return action.payload;
//         default:
//             return state;
//     }
// }

const uploadedFile = (state = {}, action) => {
    switch(action.type) {
        case 'SET_UPLOADS':
            return action.payload;
        default:
            return state;
    }
}


const imageReducer = combineReducers({
    // files,
    uploadedFile
})

export default imageReducer;