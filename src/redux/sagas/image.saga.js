import axios from 'axios';

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
        const data = new FormData(); //declare FormData (IMPORTANT STEP!!)
        data.append('file', newFile.files) // this data contains this file and contains this header

        yield console.log('Post new files to upload', data);
        const response = yield axios.post('/api/images/files', data, {
            headers: {
                'content-type': 'multipart / form-data'
            }
        });
        yield put({ type: 'SET_UPLOADS', payload: response.data})
    } catch (error) {
        console.log('error in uploadImage)', error)
    }
}

function* ImageSaga() {
    yield takeLatest('UPLOAD_IMAGE', uploadImage);
    yield takeLatest('FETCH_IMAGE', fetchImage);
}

export default ImageSaga;