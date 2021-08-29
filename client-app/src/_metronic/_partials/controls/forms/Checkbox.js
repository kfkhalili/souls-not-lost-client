import React from "react";
import { useIntl } from 'react-intl';

export function Checkbox({ isSelected, onChange, children , label  , ...rest}) {

  const intl = useIntl();
  const I18Label = intl.formatMessage({id:label,defaultMessage:label})
  const name = rest.field.name


  const handleChange = ({target : {checked}})=>{
    rest.form.setFieldValue(name , checked)
  }

  return (
    <>
      {I18Label && <label>{I18Label}</label>}
      <input type="checkbox" style={{display: "none"}} />
      <label className="checkbox checkbox-lg checkbox-single">
        <input type="checkbox"   checked={rest.form.values?.[name]} onChange={handleChange} />
        {children}
        <span />
      </label>
    </>
  );
}
