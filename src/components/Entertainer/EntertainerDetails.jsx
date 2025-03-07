import React, { useState } from "react";
import Input from "../Input";
import Select from "../Select";
import RadioButton from "../RadioButton";
import Button from "../Button";

const EntertainerDetailsForm = ({
  formData,
  errors,
  categories,
  subcategories,
  performanceRole,
  options,
  isEditing,
  handleInputChange,
  handleCategoryChange,
  handleSubCategoryChange,
  handleSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="col-md-8">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg col-11 border-0 rounded p-4">
            <div className="card-body">
              <h5 className="text-start text-primary">Entertainer Details</h5>
              <hr className="mb-4" />

              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <>
                  <div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="fw-medium">Entertainer Name</label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          placeholder="Enter Entertainer Name"
                          onChange={handleInputChange}
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="fw-medium">Bio</label>
                        <textarea
                          className="form-control"
                          name="bio"
                          value={formData.bio || ""}
                          onChange={handleInputChange}
                          placeholder="Describe yourself"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="fw-medium">Contact Number 1</label>
                        <Input
                          type="text"
                          name="phone1"
                          value={formData.phone1 || ""}
                          placeholder="Enter your contact number."
                          onChange={handleInputChange}
                        />
                        {errors.phone1 && (
                          <div className="text-danger">{errors.phone1}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="fw-medium">Contact Number 2</label>
                        <Input
                          type="text"
                          name="phone2"
                          value={formData.phone2 || ""}
                          placeholder="Enter another contact number."
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}



              {/* Step 3: Performance Details */}
              {currentStep === 2 && (
                <div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="fw-medium">Main Category</label>
                      <Select
                        options={categories}
                        value={formData.category || ""}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        placeholder="Select Category"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="fw-medium">Sub Category</label>
                      <Select
                        options={subcategories}
                        value={formData.specific_category || ""}
                        onChange={(e) =>
                          handleSubCategoryChange(e.target.value)
                        }
                        placeholder="Select Subcategory"
                        isDisabled={!formData.category}
                      />
                    </div>
                    <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="fw-medium">Availability?</label>
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
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="fw-medium">Vaccinated?</label>
                      <RadioButton
                        name="vaccinated"
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
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <>
                <div className="row mb-3">
                <div className="col-md-6">
                     <label className="fw-medium">Performance Role</label>
                    <Select
                      name="performanceRole"
                       options={performanceRole}
                       defaultOption="--Select Role--"
                       value={formData.performanceRole || ""}
                       onChange={handleInputChange}
                     />
                     {errors.performanceRole && (
                       <div className="text-danger">
                         {errors.performanceRole}
                       </div>
                     )}
                   </div>
                   <div className="col-md-6">
                     <label className="fw-medium">Price Per Event</label>
                   <Input
                      type="number"
                      name="pricePerEvent"
                      value={formData.pricePerEvent || ""}
                      placeholder="Rs."
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                <div className="row mb-3">
                   <label className="fw-medium">Social Media Link</label>
                   <div className="col-md-8 col-sm-12">
                    <Input
                      type="text"
                      name="socialLinks"
                      value={formData.socialLinks || ""}
                      placeholder="Enter your Social Media Link"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="row mt-4">
                <div className="col d-flex justify-content-between">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      className="btn-secondary"
                      label="Previous"
                      onClick={prevStep}
                    />
                  )}

                  {currentStep < 3 && (
                    <Button
                      type="button"
                      className="btn-primary"
                      label="Next"
                      onClick={nextStep}
                    />
                  )}

                  {currentStep === 3 && (
                    <Button
                      type="submit"
                      className="btn-success"
                      label={isEditing ? "Update" : "Submit"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EntertainerDetailsForm;
