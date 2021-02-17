import React from 'react';
import PropTypes from 'prop-types';
import './confirmDialogStyles.css';

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

function ConfirmDialog(props) {
  const {open, children} = props;
  if (!open) return null;
  return (
    <div className="modal-outer-wrapper">
      <div className="modal-inner-wrapper">
        {children}
      </div>
    </div>
  );
}

export default ConfirmDialog;