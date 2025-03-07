import React, { useState } from "react";
import Input from "../Input";
import Select from "../Select";
import RadioButton from "../RadioButton";
import axios from "axios";

export default function EnterProfileContainer({
    formData,
    errors,
    categories,
    subcategories,
    performanceRole,
    options,
    isEditing,
    headshot,
    handleInputChange,
    handleCategoryChange,
    handleSubCategoryChange,
    handleSubmit,
    setHeadshot
}) {
    const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
    const token = localStorage.getItem("token");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleHeadshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const uploadHeadshot = async () => {
        if (!selectedFile) {
            toast.error("Please select a headshot to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("headshot", selectedFile);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}media/uploads`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
              console.log(response.data)
            if (response.status === 201) {
                toast.success("Headshot uploaded successfully!");
                setHeadshot(response.data.headshot); 
            }
        } catch (error) {
            console.error("Error uploading headshot:", error);
            toast.error("Failed to upload headshot.");
        }
    };
    return (
        <>
            <div className="profile-container">
                <p className="fw-bold mb-0">PROFILE</p>
                <hr />
                <p className="dash-font text-muted">
                    The contact information provided below is for Pique Entertainment's
                    records only.
                </p>
                <form className="scrollable-container">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="dash-font fw-semibold">Name*</label>
                            <Input
                                type="text"
                                name="name"
                                className="form-control dash-font"
                                value={formData.name || ""}
                                placeholder="Enter Entertainer Name"
                                onChange={handleInputChange}
                            />
                            <label className="dash-font fw-semibold">Bio</label>
                            <textarea
                                className="form-control dash-font"
                                name="bio"
                                value={formData.bio || ""}
                                onChange={handleInputChange}
                                placeholder="Describe yourself"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-8">
                                    <label className="dash-font fw-semibold">
                                        Profile Headshot*
                                    </label>
                                    <p className="icon-font mb-0">Guidelines:</p>
                                    <ol className="dash-navbar-font text-start mb-1">
                                        <li>Choose an image where your face is recognizable.</li>
                                        <li>
                                            {" "}
                                            Your profile photo should not contain text, logos, or
                                            contact information.
                                        </li>
                                        <li>
                                            Should be in .jpg or .png format. (max file size 10mb)
                                        </li>
                                    </ol>
                                    <button
                                        type="button"
                                        className="btn enter-btn icon-font text-white rounded-3"
                                    >
                                        Upload
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={headshot ? headshot : `${imagePath}magician-showing-trick.png`}
                                        style={{ height: "130px", width: "119px" }}
                                        alt="Profile Headshot"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <label className="dash-font fw-semibold">Contact Number 1</label>
                            <Input
                                type="text"
                                name="phone1"
                                value={formData.phone1 || ""}
                                placeholder="Enter your contact number."
                                onChange={handleInputChange}
                                className="form-control dash-font"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="dash-font fw-semibold">Contact Number 2</label>
                            <Input
                                type="text"
                                name="phone2"
                                value={formData.phone2 || ""}
                                placeholder="Enter another contact number."
                                onChange={handleInputChange}
                                className="form-control dash-font"
                            />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-6">
                            <label className="dash-font fw-semibold">Main Category</label>
                            <Select
                                options={categories}
                                value={formData.category || ""}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                placeholder="Select Category"
                                className="form-control dash-font"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="dash-font fw-semibold">Sub Category</label>
                            <Select
                                options={subcategories}
                                value={formData.specific_category || ""}
                                onChange={(e) => handleSubCategoryChange(e.target.value)}
                                placeholder="Select Subcategory"
                                isDisabled={!formData.category}
                                className="form-control dash-font"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 dash-font">
                            <label className="dash-font fw-semibold">Availability</label>
                            <RadioButton
                                name="availability"
                                options={options}
                                value={formData.availability || ""}
                                onChange={(selectedValue) =>
                                    handleInputChange({
                                        target: {
                                            name: "availability",
                                            value: selectedValue,
                                        },
                                    })
                                }
                                className="form-control dash-font"
                            />
                        </div>
                        <div className="col-md-6 dash-font">
                            <label className="dash-font fw-semibold">Vaccinated?</label>
                            <RadioButton
                                name="vaccinated"
                                className="form-control dash-font"
                                options={options}
                                value={formData.vaccinated || ""}
                                onChange={(selectedValue) =>
                                    handleInputChange({
                                        target: {
                                            name: "vaccinated",
                                            value: selectedValue,
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-6 dash-font">
                            <label className="dash-font fw-semibold">Performance Role</label>
                            <Select
                                name="performanceRole"
                                options={performanceRole}
                                className="form-control dash-font"
                                defaultOption="--Select Role--"
                                value={formData.performanceRole || ""}
                                onChange={handleInputChange}
                            />
                            {errors.performanceRole && (
                                <div className="text-danger">{errors.performanceRole}</div>
                            )}
                        </div>

                        <div className="col-md-6 dash-font">
                            <label className="dash-font fw-semibold">Price Per Event</label>
                            <Input
                                type="number"
                                name="pricePerEvent"
                                className="form-control dash-font"
                                value={formData.pricePerEvent || ""}
                                placeholder="Rs."
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <button
                                type="submit"
                                className="btn enter-btn icon-font text-white rounded-3"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
