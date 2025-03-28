import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmationModal({ show, handleClose, handleDelete, item, itemType }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this <strong>{itemType}</strong>: <strong>{item?.name}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
