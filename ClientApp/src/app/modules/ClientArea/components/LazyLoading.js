import React, {useEffect} from "react"
import {useVisibilityHook} from 'react-observer-api';

export const LazyLoading = ({callback}) => {
    const {setElement, isVisible} = useVisibilityHook({
        root: null,
        threshold: 0,
        rootMargin: '0px'
    }, false);
    useEffect(() => {
        if (isVisible) {
            const fetch = async () => {
              await callback();
            }
            fetch();
        }
    }, [isVisible])

    return (<div ref={setElement} className="w-100 h-50px bg-white"> {!isVisible && <span>loading</span>} </div>)
};