import React from "react";
import {Spinner} from "react-bootstrap";
import {toAbsoluteUrl} from "../../_helpers";

export function SplashScreen() {
    return (
        <>
            <section className="h-100vh d-flex justify-content-center align-items-center">
                {/*<div className="h-200px w-200px">*/}
                {/*    <img*/}
                {/*        src="%PUBLIC_URL%/images/soles-not-lost-logo.png"*/}
                {/*        alt="Soles Solutions"*/}
                {/*    />*/}
                {/*    <svg className="splash-spinner" viewBox="0 0 50 50">*/}
                {/*        <circle*/}
                {/*            className="path"*/}
                {/*            cx="25"*/}
                {/*            cy="25"*/}
                {/*            r="20"*/}
                {/*            fill="none"*/}
                {/*            strokeWidth="5"*/}
                {/*        />*/}
                {/*    </svg>*/}
                {/*</div>*/}
            </section>
        </>
    );
}
