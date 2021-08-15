import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { put, takeLatest } from "redux-saga/effects";
// import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: undefined,
  token: undefined,
};

export const reducer = persistReducer(
  { storage, key: "v713-demo1-auth", whitelist: ["user", "token"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        return action.payload;
      }

      case actionTypes.Register: {
        const { token } = action.payload;

        return { token, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (token) => ({ type: actionTypes.Login, payload: { token } }),
  register: (token) => ({
    type: actionTypes.Register,
    payload: { token },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

// export function* saga() {
//   yield takeLatest(actionTypes.Login, function* loginSaga() {
//     yield put(actions.requestUser());
//   });
//
//   yield takeLatest(actionTypes.Register, function* registerSaga() {
//     yield put(actions.requestUser());
//   });
//
//   yield takeLatest(actionTypes.UserRequested, function* userRequested() {
//     // const { data: user } = yield getUserByToken();
//
//     yield put(actions.fulfillUser({name:"test",}));
//   });
// }
