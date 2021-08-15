 import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/people/actions";
import { ValidateTokenDialogHeader } from "./ValidateTokenDialogHeader";
import { ValidateTokenFrom } from "./ValidateTokenFrom";
import { useUIContext } from "../UIContext";

export function ValidateTokenDialog({ id, show, onHide }) {
  // People UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      initPerson: UIContext.initPerson,
    };
  }, [UIContext]);

  // People Redux state
  const dispatch = useDispatch();
  const { actionsLoading, personForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.people.actionsLoading,
      itemForEdit: state.people.personForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Person by id
    dispatch(actions.fetchPerson(id));
  }, [id, dispatch]);

  // server request for saving person
  const savePerson = (person) => {
    if (!id) {
      // server request for creating person
      dispatch(actions.createPerson(person)).then(() => onHide());
    } else {
      // server request for updating person
      dispatch(actions.updatePerson(person)).then(() => onHide());
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
        savePerson={savePerson}
        actionsLoading={actionsLoading}
        person={personForEdit || UIProps.initPerson}
        onHide={onHide}
      />
    </Modal>
  );
}
