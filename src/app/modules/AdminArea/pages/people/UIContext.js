import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./UIHelpers";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const UIConsumer = UIContext.Consumer;

export function UIProvider({UIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initPerson = {
    id: undefined,
    From: "",
    Destin: "",
    email: "",
    personName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPerson: initPerson,
    newPersonButtonClick: UIEvents.newPersonButtonClick,
    viewPersonButtonClick: UIEvents.viewPersonButtonClick,
    openEditPersonDialog: UIEvents.openEditPersonDialog,
    openDeletePersonDialog: UIEvents.openDeletePersonDialog,
    openDeletePeopleDialog: UIEvents.openDeletePeopleDialog,
    openFetchPeopleDialog: UIEvents.openFetchPeopleDialog,
    openUpdatePeopleStatusDialog: UIEvents.openUpdatePeopleStatusDialog,
    openChangeRole: UIEvents.openChangeRole
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
