import React from 'react';

const ToastMessage = ({ show, onClose, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="toast show position-absolute bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">Notification</strong>
                <small>à l'instant</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default ToastMessage;