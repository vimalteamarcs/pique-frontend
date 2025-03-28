import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { CREATE_CATEGORY } from "../../../constants";

export default function SubCategoryModal({ mainCategoryId, fetchSubCategories, show, handleClose }) {
  const [subname, setSubname] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_CATEGORY}`,
        {
          name: subname,
          parentId: mainCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Sub-category created successfully");
      fetchSubCategories(); // Refresh the subcategory list
      setSubname("");

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        handleClose();
        setSuccess(""); // Clear success message after closing
      }, 2000);
    } catch (err) {
      setError("Failed to create subcategory");
      setTimeout(() => {
        handleClose();
        setError("");
      }, 2000);
    }
  };

  return (


    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Add Subcategory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {mainCategoryId ? (
          <Form onSubmit={handlesubSubmit} className=" align-items-center">
            <Form.Label className="fw-semibold">
              Subcategory Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subcategory name"
              value={subname}
              onChange={(e) => setSubname(e.target.value)}
              required
              className="col-12"
            />
            <Button variant="danger" onClick={handleClose} className="btn rounded-3 mt-3 btn-sm float-end ms-2">
              Close
            </Button>
            <Button type="submit" variant="dark" size="sm" className="btn rounded-3 mt-3 float-end">
              Add Subcategory
            </Button>

          </Form>
        ) : (
          <p className="text-danger">Please select a category first.</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
