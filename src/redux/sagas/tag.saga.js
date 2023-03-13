import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get tags
function* getTags(action) {
    try {
        let response = yield axios.get('/api/tag');
        yield put ({type: 'SET_TAG', payload: response.data})
    } catch (error) {
        console.error(`Error getting tag`, error);
    }
}

export default tagSaga;