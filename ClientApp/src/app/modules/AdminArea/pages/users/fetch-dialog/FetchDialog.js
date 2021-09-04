import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  UserStatusCssClasses,
  UserStatusTitles,
} from "../UIHelpers";
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

export function FetchDialog({ show, onHide }) {
  // Users UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
    };
  }, [UIContext]);

  // Users Redux state
  const { users } = useSelector(
    (state) => ({
      users: selectedUsers(
        state.users.entities,
        UIProps.ids
      ),
    }),
    shallowEqual
  );

  // if users weren't selected we should close modal
  useEffect(() => {
    if (!UIProps.ids || UIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
