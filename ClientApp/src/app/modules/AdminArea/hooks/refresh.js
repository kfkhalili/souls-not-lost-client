import React, {useMemo} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

export const useRefresh = (resource,actions,useUIContext) => {
    const UIContext = useUIContext();
    const dispatch = useDispatch();

    const UIProps = useMemo(() => {
        return {
            ids: UIContext.ids,
            viewUserButtonClick: UIContext.viewUserButtonClick,
        };
    }, [UIContext]);
    const {currentState} = useSelector(
        (state) => ({
            currentState: state[resource],
        }),
        shallowEqual
    );
    const refresh = () => dispatch(actions.fetchItems(UIProps.queryParams))
    return {refresh, listLoading: currentState?.listLoading};
}