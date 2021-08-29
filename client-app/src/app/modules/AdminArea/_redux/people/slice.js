import {createSlice} from "@reduxjs/toolkit";

const initialpeopleState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  personForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const slice = createSlice({
  name: "people",
  initialState: initialpeopleState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getpersonById
    personFetched: (state, action) => {
      state.actionsLoading = false;
      state.personForEdit = action.payload.personForEdit;
      state.error = null;
    },
    // findpeople
    listFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities =  action.payload.entities;
      state.totalCount =  action.payload.totalCount;
    },
    // createPerson
    personCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.person);
    },
    // updatePerson
    personUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.person.id) {
          return action.payload.person;
        }
        return entity;
      });
    },
    // deletePerson
    personDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },// tokenGenerated
    tokenGenerated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === +action.payload.id) {
          state.personForEdit = {...entity,token:action.payload.token};
          return {...entity,token:action.payload.token};
        }
        return entity;
      });
    },
    // deletePeople
    peopleDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // peopleUpdateState
    peopleStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
