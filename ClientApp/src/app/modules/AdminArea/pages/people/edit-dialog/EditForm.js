// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import {Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import FormikForm from "../../../../../../_metronic/_partials/controls/FormikForm";
import useFields from "./fields";
import {CancelButton, SaveButton} from "../../../../../../_metronic/_TransaltedButtons";
import {shallowEqual, useSelector} from "react-redux";
const mapData = (entity) => {
    if(!entity)
        return;
    return  {
        ...entity,
        birth: new Date(entity.birth),
        death: new Date(entity.death),
        nationality: entity.nationality?._id,
        occupation: entity.occupation,
        causeOfDeath: entity.causeOfDeath?._id,
        deathPlace: entity.deathPlace?._id
    }
}

export function EditForm({
                             saveItem,
                             item,
                             onHide,
                         }) {
    const {actionsLoading, personForEdit} = useSelector(
        (state) => ({
            actionsLoading: state.people.actionsLoading,
            personForEdit: state.people.personForEdit,
        }),
        shallowEqual
    );
    const {fields, initialValues} = useFields(personForEdit);
    const PersonEditSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("required"),
        birth: Yup.string().required(),
        death: Yup.string().required(),
        nationality: Yup.string().required(),
        occupation: Yup.array().required(),
        causeOfDeath: Yup.string().required(),
        picture: Yup.mixed().required()
    });

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={mapData(personForEdit) || initialValues}
                validationSchema={PersonEditSchema}
                onSubmit={saveItem}
            >
                {(fProps) => {
                    return (<>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success"/>
                                </div>
                            )}
                            <FormikForm fields={fields}/>
                        </Modal.Body>
                        <Modal.Footer>

                            <CancelButton onClick={onHide}/>
                            <SaveButton
                                id={item?.id}
                                disabled={!fProps.isValid || fProps.isSubmitting}
                                onClick={() => fProps.handleSubmit()}
                            />
                        </Modal.Footer>
                    </>)
                }}
            </Formik>
        </>
    );
}
