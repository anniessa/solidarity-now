import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchImage() {
    try {
        yield axios.get('/api/images/files');
        yield put({ type: 'SET_UPLOADS'})
    } catch (error) {
        console.log('error refreshing image', error)
    }
}

function* uploadImage(action) {
    console.log('file', action.payload.file)
    try {
        //receive array of files
        const newFile = action.payload.file;
        console.log('newFile', newFile)
        const data = new FormData(); //declare FormData (IMPORTANT STEP!!)
        data.append('file', newFile) // this data contains this file and contains this header

        yield console.log('Post new files to upload', data);
        const response = yield axios.put('/api/images/files', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        yield put({ type: 'SET_UPLOADS', payload: response.data})
    } catch (error) {
        console.error('error in uploadImage', error)
    }
}

function* ImageSaga() {
    yield takeLatest('UPLOAD_IMAGE', uploadImage);
    yield takeLatest('FETCH_IMAGE', fetchImage);
}

export default ImageSaga;