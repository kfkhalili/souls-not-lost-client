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
import {ContentRoute} from "../../../../../_metronic/layout";

export function Page() {
    const history = useHistory()
    const UIEvents = {
        newPersonButtonClick: () => {
            history.push("/people/new");
        },
        viewPersonButtonClick: () => {
            history.push("/people/view");
        },
        openEditPersonDialog: (id) => {
            history.push(`/people/${id}/edit`);
        },
        openDeletePersonDialog: (id) => {
            history.push(`/people/${id}/delete`);
        }
    }

    return (
        <UIProvider UIEvents={UIEvents}>
            <ContentRoute path="/people">
                    <LoadingDialog/>
                    <Route path="/people/new">
                        {({history, match}) => (
                            <EditDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/people/validate/token">
                        {({history, match}) => (
                            <ValidateTokenDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/people/:id/edit">
                        {({history, match}) => (
                            <EditDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/people/:id/delete">
                        {({history, match}) => (
                            <DeleteDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/people/:id/makeadmin">
                        {({history, match}) => (
                            <DeleteDialog
                                show={match != null}
                                id={match && match.params.id}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/people/fetch">
                        {({history, match}) => (
                            <FetchDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
                    <Route path="/people/updateStatus">
                        {({history, match}) => (
                            <UpdateStateDialog
                                show={match != null}
                                onHide={() => {
                                    history.push("/people");
                                }}
                            />
                        )}
                    </Route>
            </ContentRoute>
            <Card/>
        </UIProvider>
    );
}

export const PersonPage = () => <Page/>
