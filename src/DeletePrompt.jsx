import { useState } from "react";

const DeletePrompt = ({ show, message, onConfirm, onCancel }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`toast align-items-center text-white bg-danger border-0 ${
          show ? "show" : "hide"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            Are you sure you want to delete "<strong>{message}</strong>"?
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onCancel}
          ></button>
        </div>
        <div className="d-flex justify-content-end px-3 pb-2">
          <button className="btn btn-sm btn-light me-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-sm btn-warning" onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrompt;
