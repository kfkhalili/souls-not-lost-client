import React from "react";

const inputLabel = ({ label, touched, error, customFeedbackLabel }) => {
  // debugger
  if (touched && error) {
    return <div className="invalid-feedback d-block">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && (
        <>
        </>
      )}
    </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && label && (
        <span className="pt-2">
        </span>
      )}
    </div>
  );
};

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel
}) {
  switch (type) {
    case "text":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "email":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "password":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel });
  }
}
