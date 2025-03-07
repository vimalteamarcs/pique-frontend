import React from "react";

const EntertainerModal = ({ show, handleClose, entertainerDetail }) => {
  if (!show) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Entertainer Details</h5>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8 col-12">
                <p>
                  <strong>Entertainer Name:</strong> {entertainerDetail.name}
                </p>
                <p>
                  <strong>Bio:</strong> {entertainerDetail.bio}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <p>
                  <strong>Phone 1:</strong> {entertainerDetail.phone1}
                </p>
              </div>
              <div className="col-md-6 col-12">
                <p>
                  <strong>Phone 2:</strong> {entertainerDetail.phone2}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <p>
                  <strong>Performance Role:</strong>{" "}
                  {entertainerDetail.performanceRole}
                </p>
              </div>
              <div className="col-md-6 col-12">
                <p>
                  <strong>Availability:</strong>{" "}
                  {entertainerDetail.availability}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <p>
                  <strong>Category:</strong> {entertainerDetail.categoryName}
                </p>
              </div>
              <div className="col-md-6 col-12">
                <p>
                  <strong>Specific Category:</strong>{" "}
                  {entertainerDetail.specificCatName}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <p>
                  <strong>Price Per Event:</strong>
                  {entertainerDetail.pricePerEvent}
                </p>
              </div>
              <div className="col-md-6 col-12">
                <p>
                  <strong>Vaccinated:</strong> {entertainerDetail.vaccinated}
                </p>
              </div>
            </div>
            <div className="row">
              <p>
                <strong>Social Links:</strong>
                <a
                  href={entertainerDetail.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entertainerDetail.socialLinks}
                </a>
              </p>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <p>
                  <strong>Created At:</strong> {entertainerDetail.createdAt}
                </p>
              </div>
              <div className="col-md-6 col-12">
                <p>
                  <strong>Updated At:</strong> {entertainerDetail.updatedAt}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainerModal;
