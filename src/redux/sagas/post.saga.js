import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
        console.log('action.payload', action.payload)
        const response = yield axios.get(`/api/post/${action.payload}`)
        // console.log(action.payload)
        yield put({type: 'SET_POST', payload: response.data})
    } catch(error) {
        console.error('Error getting posts by specific user', error)
    }
}

// editing post
function* editPost(action) {
    try {
        console.log('action.payload for edit post', action.payload)
        yield axios.put(`/api/post/${action.payload.postId}`, action.payload)
        yield put({type: 'GET_POST'});
    } catch (error) {
        console.error(`Error with editing post`, error)
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
            tags: []
        })
        }
    } catch (error) {
        console.error(`error posting full post`, error)
    }
}

function* deletePost(action) {
    console.log('action.payload', action.payload)
    const swal = withReactContent(Swal);

    try {
        let sweet = yield swal.
        fire ({
            title: 'Are you sure you want to delete this post?',
            confirmButtonText: 'Delete',
            confirmButtonColor:'#FF0000',
            cancelButtonColor: '#FFA500',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        })
        if(sweet.isConfirmed) {
            yield axios.delete(`/api/post/${action.payload}`);
            yield put({type: 'GET_POST'})
        }
    } catch (error) {
        console.error('Error deleting post', error);
    }

}

function* postSaga() {
    yield takeLatest('ADD_POST', addPost);
    yield takeLatest('GET_POST', getPost);
    yield takeLatest('GET_POST_BY_ID', getPostById);
    yield takeLatest('EDIT_POST', editPost);
    yield takeLatest('DELETE_POST', deletePost);
}

export default postSaga;