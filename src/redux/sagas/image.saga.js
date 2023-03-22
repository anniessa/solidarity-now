import axios from 'axios';
import { useSelector } from 'react-redux';

const baseURL = process.env.APP_API;

const user = useSelector(store => store.user);

function* getImage() {

}


function* uploadImage(action) {
    let formData = new FormData();
    formData.append('name', action.name);
    formData.append('file', action.payload)
    axios.post('/', formData, {
        headers: {
            'Content-Type: '
        }
    })
    yield put({type: 'GET_IMAGE'})
};

function* ImageSaga(){
    yield takeLatest('UPLOAD_IMAGE', uploadImage);
    yield takeLatest('GET_IMAGE', getImage);
}

export default ImageSaga;