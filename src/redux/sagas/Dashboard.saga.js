import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchHomepageDashboard() {
  try {
    //saving the axios get request to response
    const response = yield axios.get("/api/dashBoard");

    //log response to the console.
    console.log("dashBoard get response is", response.data);

    //passing the response to my reducer
    yield put({ type: "SET_DASHBOARD", payload: response.data });
  } catch (error) {
    console.log("dashboard get error is", error.data); 
  }
}

function* deleteUserInfo(action) {
    try {

        yield Promise.all( action.payload.map((id) => {
             axios.delete(`/api/remove-session/${id}`)
        }))
        

        yield put({
            type: 'FETCH_DASHBOARD'
        })
    } catch (error) {

    }
}



function* fetchOpenMinneapolisApi () {
  try {
    //saving the axios get request to response
    const response = yield axios.get("/api/dashBoard/MplsApi")

    //passing the response to my reducer

    yield put({
      type: "SET_OPEN_MINNEAPOLIS_API",
      payload: response.data

    })

  } catch (error) {
    console.log("Get Open Minneapolis Api is", error)
    
  }

}

function* fetchDashboard() {
  yield takeLatest("FETCH_DASHBOARD", fetchHomepageDashboard);
  yield takeLatest("FETCH_OPEN_MINNEAPOLIS_API", fetchOpenMinneapolisApi)
  yield takeLatest("DELETE_SESSION", deleteUserInfo)
}

export default fetchDashboard;
