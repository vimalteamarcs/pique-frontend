import React, { useState, useEffect } from "react";
import axios from "axios";
import DashLayout from "../DashLayout";
import {
  CREATE_CATEGORY,
  GET_SUB_CATEGORY,
  GET_MAIN_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../../constants";
import CategoryModal from "../../components/CategoryModal";
import AdminSideBar from "../../components/Venue/AdminSideBar";
import { Button, Modal } from "react-bootstrap";
import SubCategoryModal from "./SubCategoryModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const CategoryForm = () => {
  const [isMainCategory, setIsMainCategory] = useState(true);
  const [name, setName] = useState("");
  const [subname, setSubname] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [subCategoryModalShow, setSubCategoryModalShow] = useState(false);

  const openCategoryModal = (category) => {
    setSelectedCategory(category);
    setCategoryModalShow(true);
    setSubCategoryModalShow(false);
  };

  const openSubCategoryModal = () => {
    setSubCategoryModalShow(true);
    setSubCategoryModalShow(false);
  };

  const openDeleteModal = (item, type) => {
    setSelectedItem(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchMainCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_MAIN_CATEGORY}`
      );
      setMainCategories(response.data);
      //console.log(response);
      if (response.data.length > 0) {
        setMainCategoryId(response.data[0].id);
      }
    } catch (err) {
      setError("Failed to fetch main categories");
    }
  };

  useEffect(() => {
    if (mainCategoryId) {
      fetchSubCategories();
    }
  }, [mainCategoryId]);

  // Fetch main categories and subcategories
  useEffect(() => {
    console.log(isMainCategory);

    if (isMainCategory) {
      fetchMainCategories();
    }
  }, [success, error]);
  const fetchSubCategories = async () => {
    if (mainCategoryId) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}${GET_SUB_CATEGORY}`,
          { parentId: mainCategoryId }
        );
        setSubCategories(response.data);
        console.log(subCategories);
      } catch (err) {
        setError("Failed to fetch subcategories");
      }
    }
  };
  useEffect(() => {
    fetchSubCategories();
  }, [mainCategoryId, success, error]);

  const handlemainSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}${CREATE_CATEGORY}`,
        {
          name: name,
          parentId: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Main category created successfully");

      setName("");
      setMainCategoryId("");
      fetchMainCategories();
    } catch (err) {
      setError("Failed to create category");
    }
  };

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
      fetchSubCategories();
      setSubname("");
    } catch (err) {
      setError("Failed to create subcategory");
    }
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}${DELETE_CATEGORY}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //setSubCategories(subCategories.filter((sub) => sub.id !== id));
      fetchSubCategories();
      fetchMainCategories();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete category");
    }
  };
  const handleDeleteMainCategory = async (id) => {
    try {
      console.log(id);

      await axios.post(
        `${import.meta.env.VITE_API_URL}${DELETE_CATEGORY}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //setSubCategories(subCategories.filter((sub) => sub.id !== id));
      fetchSubCategories();
      fetchMainCategories();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedItem || !selectedItem.id) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}${DELETE_CATEGORY}`,
        { id: selectedItem.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Refresh the lists after deletion
      fetchSubCategories();
      fetchMainCategories();

      // Close the modal after deletion
      setShowDeleteModal(false);
    } catch (err) {
      setError(`Failed to delete ${deleteType}`);
    }
  };


  return (
    <>
      <DashLayout />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="div">
                  <div className="profile-font">
                    {error && (
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        {error}
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setError("")} // Clears the error message when the close button is clicked
                        />
                      </div>
                    )}

                    {success && (
                      <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                      >
                        {success}
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setSuccess("")} // Clears the success message when the close button is clicked
                        />
                      </div>
                    )}

                    {/* Main Category Creation Form */}
                    <p className="fw-semibold">CREATE CATEGORY</p>
                    <hr className="mt-3 mb-0 w-100" />
                    {/* <!-- Modal --> */}
                    {/* <CategoryModal
                      data={categoryData}
                      done={setSuccess}
                      err={setError}
                    /> */}

                    {/* Sub Category Creation Form */}
                    <div className="row">
                      <div className="col-md-4">
                        <div className="d-flex mt-5">
                          <p className=" profile-font fw-semibold">Main Categories</p>
                          <button className="btn btn-outline-primary btn-sm mb-3 ms-2" onClick={() => setIsModalOpen(true)}><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <div
                          className="list-group  overflow-auto"
                          style={{
                            maxHeight: "600px",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#ccc transparent",
                          }}
                        >
                          {mainCategories.map((category) => (
                            <div key={category.id} className="d-flex">
                              <button
                                className={`list-group-item list-group-item-action ${mainCategoryId === category.id ? " text-info" : ""
                                  }`}
                                onClick={() => {
                                  setMainCategoryId(category.id);
                                }}
                              >
                                {category.name}
                              </button>

                              {/* Open Modal when clicking edit */}
                              <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => openCategoryModal(category)}
                              >
                                <i className="fas fa-edit text-primary"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => openDeleteModal(category, "Main Category")}
                              >
                                <i className="fas fa-trash text-danger"></i>
                              </button>
                            </div>
                          ))}

                          <CategoryModal
                            show={categoryModalShow}
                            handleClose={() => setCategoryModalShow(false)}
                            data={selectedCategory}
                            done={(msg) => alert(msg)}
                            err={(msg) => alert(msg)}
                          />

                        </div>
                      </div>

                      <div className="col-md-8">
                        {/* Subcategory Creation Form */}
                        <div className="row">
                          <div className="d-flex mt-4">
                            <p className=" profile-font mt-4 fw-semibold">SubCategories</p>
                            {/* <button className="btn btn-outline-primary btn-sm mb-3 mt-4 ms-2" onClick={() => setIsSubModalOpen(true)}><i className="fa-solid fa-plus"></i></button>
                          </div>
                          {mainCategoryId && (
                            <form
                              onSubmit={handlesubSubmit}
                              className="mb-3 d-flex align-items-center p-3"
                            >
                              <label
                                htmlFor="name"
                                className="form-label me-2 mb-0 fw-semibold"
                              >
                                Subcategory Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                className="form-control me-2"
                                placeholder="Enter subcategory name"
                                value={subname}
                                onChange={(e) => setSubname(e.target.value)}
                                required
                                style={{ width: "250px" }}
                              />
                              <button type="submit" className="btn btn-dark btn-sm">
                                ADD
                              </button>
                            </form>
                          )} */}
                            <button className="btn btn-outline-primary btn-sm mb-3 mt-4 ms-2" onClick={() => setSubCategoryModalShow(true)}>
                              <i className="fa-solid fa-plus"></i>
                            </button></div>

                          <SubCategoryModal
                            show={subCategoryModalShow}
                            handleClose={() => setSubCategoryModalShow(false)}
                            mainCategoryId={mainCategoryId}
                            fetchSubCategories={fetchSubCategories}
                          />
                        </div>

                        {/* Subcategory Cards */}
                        <div className="row">
                          {subCategories.length > 0 && (
                            <div className="">
                              <div
                                className=" d-flex  flex-wrap overflow-auto"
                                style={{
                                  maxHeight: "600px",
                                  scrollbarWidth: "thin",
                                  scrollbarColor: "#ccc transparent",
                                }}
                              >
                                {subCategories.map((sub) => (
                                  <div key={sub.id} className="mb-3">
                                    <div
                                      className=""
                                      style={{
                                        width: "fit-content",
                                        position: "relative",
                                      }}
                                    >
                                      <div className="card-body p-2">
                                        <button
                                          type="button"
                                          className="btn btn-outline-dark btn-sm text-capitalize position-relative"
                                          style={{ paddingRight: "30px" }}
                                          data-bs-toggle="custom-modal"
                                          data-bs-target="#emodal"
                                          onClick={() => setCategoryData(sub)}
                                        >
                                          {sub.name}
                                        </button>
                                        {/* <button
                                          type="button"
                                          className="btn-close position-absolute p-1"
                                          style={{
                                            top: "50%",
                                            right: "15px",
                                            transform: "translateY(-50%)",
                                            fontSize: "10px", // Makes the button smaller
                                          }}
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                `Are you sure you want to delete this ${sub.name}?`
                                              )
                                            ) {
                                              handleDeleteSubCategory(sub.id);
                                            }
                                          }}
                                        /> */}

                                        <button
                                          type="button"
                                          className="btn-close position-absolute p-1"
                                          style={{
                                            top: "50%",
                                            right: "15px",
                                            transform: "translateY(-50%)",
                                            fontSize: "10px", // Makes the button smaller
                                          }}
                                          onClick={() => openDeleteModal(sub, "Subcategory")}
                                        />

                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* create category modal */}
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Create Main Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handlemainSubmit}
            >
              <label htmlFor="name" className="form-label fw-semibold">
                Main Category Name
              </label>
              <div className="col">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-dark btn-sm rounded-3">
              Add Category
            </button>
            <Button variant="danger" className="btn-sm rounded-3" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <DeleteConfirmationModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDeleteCategory}
          item={selectedItem}
          itemType={deleteType}
        />
      </div>
    </>
  );
};

export default CategoryForm;
