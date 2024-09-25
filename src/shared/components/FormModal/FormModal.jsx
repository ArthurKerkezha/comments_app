import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

const FormModal = ({ children, isOpen, onClose }) => (
  <Modal
    destroyOnClose
    open={isOpen}
    okButtonProps={{ style: { display: "none" } }}
    onCancel={onClose}
  >
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
