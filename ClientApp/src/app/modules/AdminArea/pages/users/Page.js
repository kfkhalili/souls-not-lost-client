import React from "react";
import {Route, useHistory} from "react-router-dom";
import {LoadingDialog} from "./loading-dialog/LoadingDialog";
import {UIProvider} from "./UIContext";
import {Card} from "./Card";
import {ChangeRoleDialog} from "./change-role-dialog/ChangeRoleDialog";
import {CanUploadDialog} from "./can-upload-dialog/CanUploadDialog";
import {ContentRoute} from "../../../../../_metronic/layout";

export function Page() {
    const history = useHistory()
    const UIEvents = {
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
            </ContentRoute>
            <Card/>
        </UIProvider>
    );
}

export const UserPage = () => <Page/>
