import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {LoadingDialog} from "./loading-dialog/LoadingDialog";
import {EditDialog} from "./edit-dialog/EditDialog";
import {DeleteDialog} from "./delete-dialog/DeleteDialog";
import {FetchDialog} from "./fetch-dialog/FetchDialog";
import {UpdateStateDialog} from "./update-status-dialog/UpdateStateDialog";
import {UIProvider} from "./UIContext";
import {Card} from "./Card";
import {ValidateTokenDialog} from "./validate-token-dialog/ValidateTokenDialog";
import {ChangeRoleDialog} from "./change-role-dialog/ChangeRoleDialog";
import {CanUploadDialog} from "./can-upload-dialog/CanUploadDialog";
import {ContentRoute} from "../../../../../_metronic/layout";

export function Page() {
    const history = useHistory()
    const UIEvents = {
        newUserButtonClick: () => {
            history.push("/users/new");
        },
        viewUserButtonClick: () => {
            history.push("/users/view");
        },
        openEditUserDialog: (id) => {
            history.push(`/users/${id}/edit`);
        },
        openDeleteUserDialog: (id) => {
            history.push(`/users/${id}/delete`);
        },
        openChangeRole: (id)=>{
            history.push(`/users/changerole/${id}`);
        },
        openCanUpload: (id)=>{
            history.push(`/users/canupload/${id}`);
        }
    }

    return (
        <UIProvider UIEvents={UIEvents}>
            <ContentRoute path="/users">
                    <LoadingDialog/>
                    <Route path="/users/new">
                        {({history, match}) => (
                            <EditDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/validate/token">
                        {({history, match}) => (
                            <ValidateTokenDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/changerole/:id">
                        {({history, match}) => (
                            <ChangeRoleDialog
                                show={match != null}
                                id={match?.params.id}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/:id/edit">
                        {({history, match}) => (
                            <EditDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/:id/delete">
                        {({history, match}) => (
                            <DeleteDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/:id/makeadmin">
                        {({history, match}) => (
                            <DeleteDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/canupload/:id">
                        {({history, match}) => (
                            <CanUploadDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/fetch">
                        {({history, match}) => (
                            <FetchDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/users/updateStatus">
                        {({history, match}) => (
                            <UpdateStateDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/users");
                                }}
                            />
                        )}
                    </Route>
            </ContentRoute>
            <Card/>
        </UIProvider>
    );
}

export const UserPage = () => <Page/>
