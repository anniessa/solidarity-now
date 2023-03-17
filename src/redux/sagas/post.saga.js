import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// setting the posts from db
function* getPost(){
    try {
        const response = yield axios.get('/api/post');
        console.log('response:', response)
        yield put({type: 'SET_POST', payload: response.data})
    } catch (error) {
        console.error('Error getting posts', error);
    }
}

// return a specific item by id
function* getPostById(action) {
    try{
        const response = yield axios.get(`/api/post/${action.payload}`)
        // console.log(action.payload)
        yield put({type: 'SET_POST', payload: response.data})
    } catch(error) {
        console.error('Error getting posts by specific user', error)
    }
}

//helper function to get post
// adding a new offer/request worker function
function* addPost(action) {
    try {
        yield axios.post('/api/post', action.payload);
        yield put({type: 'GET_POST'})

        if (action.callback) {
            action.callback({
            post_type: '',
            content: '',
            additional_resource: '',
            tag_ids: []
        })
        }
    } catch (error) {
        console.error(`error posting full post`, error)
    }
}

function* postSaga() {
    yield takeLatest('ADD_POST', addPost);
    yield takeLatest('GET_POST', getPost);
    yield takeLatest('GET_POST_BY_ID', getPostById);
}

export default postSaga;