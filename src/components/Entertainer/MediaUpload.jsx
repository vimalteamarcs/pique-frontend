import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import { Link } from "react-router-dom";

const MediaUpload = ({
  handleFileChange,
  handleDeleteHeadshot,
  handleDeleteImage,
  handleDeleteVideo,
  headshot,
  image = [],
  video = [],
  mediaUpload,
  mediaProp,
  // onMediaUpdate,
}) => {
  const [media, setMedia] = useState([]);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    setMedia(mediaProp); // mediaProp comes from EntertainerProfile
  }, [mediaProp]);

  const [previewMedia, setPreviewMedia] = useState([]);

  const openModal = (type) => {
    setModalType(type);
    setPreviewMedia([]); // Reset preview when opening modal
  };

  const closeModal = () => {
    setModalType(null);
    setPreviewMedia([]);
  };

  const handleFileSelect = (e, type) => {
    handleFileChange(e, type); // Pass files to parent
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type,
    }));
    setPreviewMedia(previews);
  };

  return (
    <>
      <div className="col-md-4">
        <form onSubmit={mediaUpload}>
          <div className="d-flex justify-content-center">
            <div className="card shadow-lg col-11 border-0 rounded">
              <div className="card-body">
                {media
                  .filter((item) => item.type === "headshot")
                  .map((item) => (
                    <div key={item.id} className="position-relative p-2">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="media-image rounded w-100 h-auto"
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                  ))}
                <h6>
                  Want to change your profile pic?
                  <Link
                    to="#"
                    className="text-primary mt-2 text-decoration-none"
                    label="Update Profile Pic"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal("headshot");
                    }}
                  >
                    (Click Here)
                  </Link>
                </h6>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <div className="card shadow-lg col-11 border-0 rounded">
              <div className="card-body">
                <h5 className="text-start text-primary mt-2">Media Uploads</h5>
                <hr className="mb-4" />
                <h6>
                  Upload images
                  <Link
                    to="#"
                    className="text-primary text-decoration-none me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal("image");
                    }}
                  >
                    (Click Here)
                  </Link>
                </h6>

                <br />
                <h6>
                  Upload Videos
                  <Link
                    to="#"
                    className="text-primary text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal("video");
                    }}
                  >
                    (Click Here)
                  </Link>
                </h6>

                <div className="row mt-4">
                  <div className="col d-flex justify-content-center">
                    <Button
                      type="submit"
                      className="btn-danger fw-semibold"
                      label="Upload Media"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {modalType && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === "headshot"
                    ? "Upload Profile Picture"
                    : modalType === "image"
                    ? "Upload Images"
                    : "Upload Videos"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {modalType && (
                  <>
                    <Input
                      type="file"
                      name={modalType}
                      accept={modalType === "video" ? "video/*" : "image/*"}
                      multiple={modalType !== "headshot"}
                      onChange={(e) => handleFileSelect(e, modalType)}
                    />
                    <div className="d-flex flex-wrap mt-2">
                      {/* Display Media from API */}
                      {media
                        ?.filter((item) => item.type === modalType)
                        ?.map((item) => (
                          <div key={item.id} className="position-relative p-2">
                            {modalType === "video" ? (
                              <video
                                src={item.url}
                                controls
                                className="media-video rounded"
                                style={{ height: "90px", width: "90px" }}
                              />
                            ) : (
                              <img
                                src={item.url}
                                alt={item.name}
                                className="media-image rounded"
                                style={{ height: "90px", width: "90px" }}
                              />
                            )}
                          </div>
                        ))}

                      {/* Display Newly Uploaded Files */}
                      {(modalType === "image"
                        ? image
                        : modalType === "video"
                        ? video
                        : []
                      )?.map((file, index) => (
                        <div key={index} className="position-relative p-2">
                          {modalType === "video" ? (
                            <video
                              src={URL.createObjectURL(file)}
                              controls
                              className="media-video rounded"
                              style={{ height: "90px", width: "90px" }}
                            />
                          ) : (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Uploaded ${modalType} ${index}`}
                              className="media-image rounded"
                              style={{ height: "90px", width: "90px" }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <Button
                  className="btn btn-primary"
                  label="Save Changes"
                  onClick={closeModal}
                />
                <Button
                  className="btn btn-secondary"
                  label="Close"
                  onClick={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Background Overlay */}
      {modalType && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default MediaUpload;
