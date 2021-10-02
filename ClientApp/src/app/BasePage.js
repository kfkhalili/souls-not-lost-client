import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import {UserPage} from "./modules/AdminArea/pages/users/Page";
import {PersonPage} from "./modules/AdminArea/pages/people/Page";

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /gallery. */
          <Redirect exact from="/" to="/gallery" />
        }
        <Route  path="/users" component={UserPage}/>
        <Route  path="/people" component={PersonPage}/>
        <Route path="/gallery" component={DashboardPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
