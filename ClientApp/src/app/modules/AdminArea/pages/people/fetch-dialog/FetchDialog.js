import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  PersonStatusCssClasses,
  PersonStatusTitles,
} from "../UIHelpers";
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

export function FetchDialog({ show, onHide }) {
  // People UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
    };
  }, [UIContext]);

  // People Redux state
  const { people } = useSelector(
    (state) => ({
      people: selectedPeople(
        state.people.entities,
        UIProps.ids
      ),
    }),
    shallowEqual
  );

  // if people weren't selected we should close modal
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
