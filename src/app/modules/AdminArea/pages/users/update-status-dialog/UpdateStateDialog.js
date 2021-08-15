import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  UserStatusCssClasses,
  UserStatusTitles,
} from "../UIHelpers";
import * as actions from "../../../_redux/users/actions";
import { useUIContext } from "../UIContext";

const selectedUsers = (entities, ids) => {
  const _users = [];
  ids.forEach((id) => {
    const user = entities.find((el) => el.id === id);
    if (user) {
      _users.push(user);
    }
  });
  return _users;
};

export function UpdateStateDialog({ show, onHide }) {
  // Users UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
    };
  }, [UIContext]);

  // Users Redux state
  const { users, isLoading } = useSelector(
    (state) => ({
      users: selectedUsers(
        state.users.entities,
        UIProps.ids
      ),
      isLoading: state.users.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!UIProps.ids || UIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update users status by selected ids
    dispatch(actions.updateUsersStatus(UIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchItems(UIProps.queryParams)).then(
          () => {
            // clear selections list
            UIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={`id${user.id}`}>
                <td>{user.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      UserStatusCssClasses[user.status]
                    } label-inline`}
                  >
                    {" "}
                    {UserStatusTitles[user.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {user.Destin}, {user.From}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
