import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addHazard(action) {
  try {
    yield axios.post('/api/hazard', action.payload);

    // yield put({ type: 'FETCH_hazard'});
  } catch (error) {
    console.log('add hazard post request failed', error);
  }
}

function* hazardSaga() {
  yield takeLatest('ADD_hazard', addHazard);
}

export default hazardSaga;