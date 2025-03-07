import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPDATE_CATEGORY } from "../../constants";

export default function CategoryModal(props) {
  const { data, done, err } = props;

  const [categoryName, setCategoryName] = useState(data?.name || "");

  useEffect(() => {
    setCategoryName(data.name);
  }, [data]);

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

      done("Category updated successfully");
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
    <div
      className="custom-modal fade-custom"
      style={{ marginTop: "10%" }}
      id="emodal"
      tabIndex="-1"
      aria-labelledby="eModalLabel"
      aria-hidden="true"
    >
      <div className="custom-modal-dialog">
        <div className="custom-modal-content">
          <div className="custom-modal-header">
            <h1 className="custom-modal-title fs-5" id="emodalLabel">
              Update Category
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="custom-modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="custom-modal-body">
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="custom-modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="custom-modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="custom-modal"
              aria-label="Close"
              onClick={handleUpdateCategory}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
