import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* translateAll() {
    try {
        yield axios.post('https://translation.googleapis.com/v3/projects/112410317836659065117/locations/global:detectLanguage', action.payload)
        yield put({type: 'SET_TRANSLATION'})
    } catch (error) {
        console.error('error translating page', error)
    }
}


function* TranslationSaga() {
    yield takeLatest('TRANSLATE_ALL', translateAll);
}

export default TranslationSaga;