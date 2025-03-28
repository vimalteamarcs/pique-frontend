import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPDATE_CATEGORY } from "../../constants";
import { Button, Form, Modal } from "react-bootstrap";



export default function CategoryModal(props) {
  const { data, done, err, show, handleClose } = props;

  // const [categoryName, setCategoryName] = useState(data?.name || "");
  const [categoryName, setCategoryName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect(() => {
  //   setCategoryName(data.name);
  // }, [data]);

  useEffect(() => {
    if (data && data.name) {
      setCategoryName(data.name);
    }
  }, [data]);

  // const handleUpdateCategory = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}${UPDATE_CATEGORY}`,
  //       {
  //         id: data.id,
  //         name: categoryName,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     done("Category updated successfully");
  //     console.log("Response:", response.data);
  //   } catch (error) {
  //     err("Error updating category");
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${UPDATE_CATEGORY}`,
        {
          id: data.id,
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage("Category updated successfully ✅");
      setTimeout(() => {
        setSuccessMessage("");
        handleClose();
      }, 2000);

      console.log("Response:", response.data);
    } catch (error) {
      err("Error updating category");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  if (!data) return <></>;
  return (

    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage ? (
          <div className="alert alert-success text-center">{successMessage}</div>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleUpdateCategory}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  );
}
