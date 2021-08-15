 import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/actions";
import { ChangeDialogHeader } from "./ChangeDialogHeader";
import { ChangeUserRole } from "./ChangeUserRole";
import { useUIContext } from "../UIContext";

export function ChangeRoleDialog({ id, show, onHide }) {
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
      itemForEdit: state.users.userForEdit
    }),
    shallowEqual
  );

  useEffect(() => {
    debugger
    // server call for getting User by id
    dispatch(actions.fetchUser(id));
  }, [id, dispatch]);

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-md"
    >
      <ChangeDialogHeader id={id} />
      <ChangeUserRole
          id={id}
          actionsLoading={actionsLoading}
        item={userForEdit}
        onHide={onHide}
      />
    </Modal>
  );
}
