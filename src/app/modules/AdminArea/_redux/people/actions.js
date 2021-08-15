import * as requestFromServer from "./crud";
import {slice, callTypes} from "./slice";

const {actions} = slice;

export const fetchItems = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPeople(queryParams)
    .then(response => {
      dispatch(actions.listFetched(response.data));
    })
    .catch(error => {
      error.clientMessage = "Can't find people";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPerson = id => dispatch => {
  if (!id) {
    return dispatch(actions.personFetched({ personForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPersonById(id)
    .then(response => {
      const person = response.data;
      dispatch(actions.personFetched({ personForEdit: person }));
    })
    .catch(error => {
      error.clientMessage = "Can't find person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePerson = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePerson(id)
    .then(response => {
      dispatch(actions.personDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPerson = personForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPerson(personForCreation)
    .then(response => {
      const { person } = response.data;
      dispatch(actions.personCreated({ person }));
    })
    .catch(error => {
      error.clientMessage = "Can't create person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const changePersonRole = (values) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .changePersonRole(values)
    .then(response => {
      dispatch(actions.tokenGenerated({...values,token:response.data}));
    })
    .catch(error => {
      error.clientMessage = "Can't create person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePerson = person => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePerson(person)
    .then(() => {
      dispatch(actions.personUpdated({person}));
    })
    .catch(error => {
      error.clientMessage = "Can't update person";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePeopleStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPeople(ids, status)
    .then(() => {
      dispatch(actions.peopleStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update people status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePeople = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePeople(ids)
    .then(() => {
      dispatch(actions.peopleDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete people";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
