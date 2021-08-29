import React, {Suspense} from "react";
import {Redirect, Switch} from "react-router-dom";
import {UserPage} from "./users/Page";
import {LayoutSplashScreen, ContentRoute} from "../../../../_metronic/layout";
export default function OCost() {
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                <ContentRoute path="/users" component={UserPage}/>
            </Switch>
        </Suspense>
    );
}
