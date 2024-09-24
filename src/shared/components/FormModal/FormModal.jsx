import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

const FormModal = ({ children, isOpen, onClose }) => (
  <Modal open={isOpen} onCancel={onClose}>
    {children}
  </Modal>
);

FormModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

FormModal.defaultProps = {
  onClose: () => null,
};
export default FormModal;
