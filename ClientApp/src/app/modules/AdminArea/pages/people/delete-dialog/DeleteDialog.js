import React, { useEffect, useMemo } from "react";
import {Modal, Spinner} from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/people/actions";
import {useUIContext} from "../UIContext";
import {useRefresh} from "../../../hooks/refresh";
import {useSnackbar} from "notistack";
import Axios from "axios";
export const useDeleteClient = ({url, state, callback, isFormData= false, type="post", id}) => {
  const {enqueueSnackbar} = useSnackbar()
  return {
    request: async () => {
      try {
        const result = await Axios[type](`${url}/${id}`)
        enqueueSnackbar("Request Succeeded", {variant: "success"});
        state.refresh()
        callback()
      } catch (e) {
        enqueueSnackbar(e.message, {variant: "error"});
      }
    }
  }
}
export function DeleteDialog({ id, show, onHide }) {
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.people.actionsLoading }),
    shallowEqual
  );
  const RefreshState = useRefresh("people", actions, useUIContext)
  const {request} = useDeleteClient(
      {
        url:"/api/admin/person",
        state: RefreshState,
        callback: onHide,
        type:"delete",
        id
      });
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Person Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this person?</span>
        )}
        {isLoading && <span>Person is deleting...</span>}
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
            onClick={request}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
          {isLoading && <Spinner/>}
        </div>
      </Modal.Footer>
    </Modal>
  );
}
