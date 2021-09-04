import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import {SaveHeader} from "../../../../../../_metronic/_TransaltedHeader";

export function EditDialogHeader({ id }) {
  // People Redux state
  const { personForEdit, actionsLoading } = useSelector(
    (state) => ({
      personForEdit: state.people.personForEdit,
      actionsLoading: state.people.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "edit person" : "add person";
    if (personForEdit && id) {
        _title += ` (${id})`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [personForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg"><SaveHeader id={id}/></Modal.Title>
      </Modal.Header>
    </>
  );
}
