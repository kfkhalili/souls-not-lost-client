 import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/actions";
import { CanUploadDialogHeader } from "./CanUploadDialogHeader";
import { ChangeUserCanUpload } from "./ChangeUserCanUpload";
import { useUIContext } from "../UIContext";

export function CanUploadDialog({ id, show, onHide }) {
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
      <CanUploadDialogHeader id={id} />
      <ChangeUserCanUpload
          id={id}
          actionsLoading={actionsLoading}
        item={userForEdit}
        onHide={onHide}
      />
    </Modal>
  );
}
