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

  const initUser = {
    id: undefined,
    From: "",
    Destin: "",
    email: "",
    userName: "",
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
    initUser: initUser,
    newUserButtonClick: UIEvents.newUserButtonClick,
    viewUserButtonClick: UIEvents.viewUserButtonClick,
    openEditUserDialog: UIEvents.openEditUserDialog,
    openDeleteUserDialog: UIEvents.openDeleteUserDialog,
    openDeleteUsersDialog: UIEvents.openDeleteUsersDialog,
    openFetchUsersDialog: UIEvents.openFetchUsersDialog,
    openUpdateUsersStatusDialog: UIEvents.openUpdateUsersStatusDialog,
    openChangeRole: UIEvents.openChangeRole,
    openCanUpload: UIEvents.openCanUpload,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
