import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {slice as userSlice} from "../app/modules/AdminArea/_redux/users/slice";
import {slice as personSlice} from "../app/modules/AdminArea/_redux/people/slice";
import {remarksSlice} from "../app/modules/AdminArea/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/AdminArea/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
    auth: auth.reducer,
    users: userSlice.reducer,
    people: personSlice.reducer,
    remarks: remarksSlice.reducer,
    specifications: specificationsSlice.reducer
});

export function* rootSaga() {
    // yield all([auth.saga()]);
}
