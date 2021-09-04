import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog as LD } from "../../../../../../_metronic/_partials/controls";

export function LoadingDialog() {
  // People Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.people.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LD isLoading={isLoading} text="Loading ..." />;
}
