import React, { useMemo } from "react";
import { useUIContext } from "../UIContext";

export function Grouping() {
  // People UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      openDeletePeopleDialog: UIContext.openDeletePeopleDialog,
      openFetchPeopleDialog: UIContext.openFetchPeopleDialog,
      openUpdatePeopleStatusDialog:
        UIContext.openUpdatePeopleStatusDialog,
    };
  }, [UIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{UIProps.ids.length}</b>
                </span>
              </label>
            </div>
            {/*<div>*/}
            {/*  <button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-danger font-weight-bolder font-size-sm"*/}
            {/*    onClick={UIProps.openDeletePeopleDialog}*/}
            {/*  >*/}
            {/*    <i className="fa fa-trash"></i> Delete All*/}
            {/*  </button>*/}
            {/*  &nbsp;*/}
            {/*  <button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-light-primary font-weight-bolder font-size-sm"*/}
            {/*    onClick={UIProps.openFetchPeopleDialog}*/}
            {/*  >*/}
            {/*    <i className="fa fa-stream"></i> Fetch Selected*/}
            {/*  </button>*/}
            {/*  &nbsp;*/}
            {/*  <button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-light-primary font-weight-bolder font-size-sm"*/}
            {/*    onClick={UIProps.openUpdatePeopleStatusDialog}*/}
            {/*  >*/}
            {/*    <i className="fa fa-sync-alt"></i> Update Status*/}
            {/*  </button>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
