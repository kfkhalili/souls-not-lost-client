 import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/actions";
import { ValidateTokenDialogHeader } from "./ValidateTokenDialogHeader";
import { ValidateTokenFrom } from "./ValidateTokenFrom";
import { useUIContext } from "../UIContext";

export function ValidateTokenDialog({ id, show, onHide }) {
  // Users UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      initUser: UIContext.initUser,
    };
  }, [UIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const { actionsLoading, userForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      itemForEdit: state.users.userForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting User by id
    dispatch(actions.fetchUser(id));
  }, [id, dispatch]);

  // server request for saving user
  const saveUser = (user) => {
    if (!id) {
      // server request for creating user
      dispatch(actions.createUser(user)).then(() => onHide());
    } else {
      // server request for updating user
      dispatch(actions.updateUser(user)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ValidateTokenDialogHeader id={id} />
      <ValidateTokenFrom
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        user={userForEdit || UIProps.initUser}
        onHide={onHide}
      />
    </Modal>
  );
}
