import React, {useState, useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import {FormattedMessage} from "react-intl";
import {I18EN} from "../../../../../../_metronic/i18n/Keys";

export function ValidateTokenDialogHeader({id}) {
    // Users Redux state
    const {userForEdit, actionsLoading} = useSelector(
        (state) => ({
            userForEdit: state.users.userForEdit,
            actionsLoading: state.users.actionsLoading,
        }),
        shallowEqual
    );
    return (
        <>
            {actionsLoading && <ModalProgressBar/>}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg" className='text-lowercase'>
                    <FormattedMessage id={I18EN["SOLES.Validate.token"]}/>
                </Modal.Title>
            </Modal.Header>
        </>
    );
}
