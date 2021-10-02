import * as requestFromServer from "./crud";
import {slice, callTypes} from "./slice";
import {changeUserCanUpload} from "./crud";

const {actions} = slice;

export const fetchItems = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUsers(queryParams)
    .then(response => {
      dispatch(actions.listFetched(response.data));
    })
    .catch(error => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = id => dispatch => {
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserById(id)
    .then(response => {
      const user = response.data;
      dispatch(actions.userFetched({ userForEdit: user }));
    })
    .catch(error => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUser = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUser(id)
    .then(response => {
      dispatch(actions.userDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUser = userForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUser(userForCreation)
    .then(response => {
      const { user } = response.data;
      dispatch(actions.userCreated({ user }));
    })
    .catch(error => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const changeUserRole = (values) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .changeUserRole(values)
    .then(response => {
      dispatch(actions.tokenGenerated({...values,token:response.data}));
    })
    .catch(error => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const canUploadChange = (values) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
      .changeUserCanUpload(values)
      .then(response => {
        dispatch(actions.tokenGenerated({...values,token:response.data}));
      })
      .catch(error => {
        error.clientMessage = "Can't create user";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
};

export const updateUser = user => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUser(user)
    .then(() => {
      dispatch(actions.userUpdated({user}));
    })
    .catch(error => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUsersStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUsers(ids, status)
    .then(() => {
      dispatch(actions.usersStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update users status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUsers = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUsers(ids)
    .then(() => {
      dispatch(actions.usersDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete users";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
