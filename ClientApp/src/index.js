/**
 * Create React ImagesCatalog entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, {useEffect, useMemo} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as _redux from "./redux";
import store, {persistor} from "./redux/store";
import App from "./app/App";
import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
import "react-datepicker/dist/react-datepicker.css";
import {
    MetronicLayoutProvider,
    MetronicSplashScreenProvider,
    MetronicSubheaderProvider
} from "./_metronic/layout";
import {I18N_CONFIG_KEY, MetronicI18nProvider} from "./_metronic/i18n";
import {SplashScreen} from "./_metronic/_partials/controls";

const ArabicLanguage = React.lazy(() => import('./_metronic/i18n/languages/arabic'));
const EnglishLanguage = React.lazy(() => import('./_metronic/i18n/languages/english'));
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env;

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
// /* const mock = */ _redux.mockAxios(axios);

/**
 * Inject metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store);
// eslint-disable-next-line
const consoleError = console.error.bind(console);

console.error = (message, ...args) => {
    if (
        typeof message === 'string' &&
        message.startsWith('[React Intl]')
    ) {
        return;
    }
    consoleError(message, ...args);
};
const initialState = {
    selectedLang: "en"
};
const LANGUAGES = {
    ENGLISH: "en",
    ARABIC: "ar"
}

function getConfig() {
    const ls = localStorage.getItem(I18N_CONFIG_KEY);
    if (ls) {
        try {
            return JSON.parse(ls);
        } catch (er) {
            console.error(er);
        }
    }
    return initialState;
}

const lang = getConfig();
if (lang.selectedLang === "ar") {
    document.body.dir = "rtl"
    document.body.style = "direction:rtl"
    document.body.direction = "rtl"
}
console.log("(lang.selectedLang === LANGUAGES.ARABIC) ",(lang.selectedLang === LANGUAGES.ARABIC) )
ReactDOM.render(
    <MetronicI18nProvider>
        <MetronicLayoutProvider>
            <MetronicSubheaderProvider>
                <MetronicSplashScreenProvider>
                    <React.Suspense fallback={<SplashScreen/>}>
                        {(lang.selectedLang === LANGUAGES.ARABIC) ? <ArabicLanguage/> : <EnglishLanguage/>}
                        <App store={store} persistor={persistor} basename={PUBLIC_URL}/>
                    </React.Suspense>
                </MetronicSplashScreenProvider>
            </MetronicSubheaderProvider>
        </MetronicLayoutProvider>
    </MetronicI18nProvider>,
    document.getElementById("root")
);
