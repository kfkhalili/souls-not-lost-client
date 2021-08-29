import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog as LD } from "../../../../../../_metronic/_partials/controls";

export function LoadingDialog() {
  // Users Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.users.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return <LD isLoading={isLoading} text="Loading ..." />;
}
