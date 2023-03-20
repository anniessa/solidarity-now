import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// setting the posts from db
function* getTagRelation(){
    try {
        const response = yield axios.get('/api/tagsPosts');
        console.log('response:', response)
        yield put({type: 'SET_TAG_RELATIONS', payload: response.data})
    } catch (error) {
        console.error('Error getting posts', error);
    }
}

function* tagsPostsSaga() {
    yield takeLatest ('GET_TAG_RELATIONS', getTagRelation);
}

export default tagsPostsSaga;