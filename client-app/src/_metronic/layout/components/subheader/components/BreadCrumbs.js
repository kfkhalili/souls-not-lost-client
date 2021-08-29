/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import {FormattedMessage} from "react-intl";

export function BreadCrumbs({ items }) {
  if (!items || !items.length) {
    return "";
  }

  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2">
      <li className="breadcrumb-item  text-muted  ">
        <Link to="/dashboard">
          <i className="flaticon2-shelter  text-muted icon-1x ml-2" />
             <span className="mx-2">

              <FormattedMessage id={"ASIDE.DASHBOARD"}/>
             </span>
          </Link>
      </li>
      {items.map((item, index) => (
        <li key={`bc${index}`} className="breadcrumb-item">
          <Link className="text-muted" to={{ pathname: item.pathname }}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
