import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  PersonStatusCssClasses,
  PersonStatusTitles,
} from "../UIHelpers";
import * as actions from "../../../_redux/people/actions";
import { useUIContext } from "../UIContext";

const selectedPeople = (entities, ids) => {
  const _people = [];
  ids.forEach((id) => {
    const person = entities.find((el) => el.id === id);
    if (person) {
      _people.push(person);
    }
  });
  return _people;
};

export function UpdateStateDialog({ show, onHide }) {
  // People UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
    };
  }, [UIContext]);

  // People Redux state
  const { people, isLoading } = useSelector(
    (state) => ({
      people: selectedPeople(
        state.people.entities,
        UIProps.ids
      ),
      isLoading: state.people.actionsLoading,
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
    // server request for update people status by selected ids
    dispatch(actions.updatePeopleStatus(UIProps.ids, status)).then(
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
          Status has been updated for selected people
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
              <th>Person</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={`id${person.id}`}>
                <td>{person.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PersonStatusCssClasses[person.status]
                    } label-inline`}
                  >
                    {" "}
                    {PersonStatusTitles[person.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {person.Destin}, {person.From}
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
