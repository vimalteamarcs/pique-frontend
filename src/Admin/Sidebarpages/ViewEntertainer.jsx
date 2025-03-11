import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DashLayout from "../DashLayout";
import {
  GET_CATEGORY_BYID,
  GET_ENTERTAINERS_BYID,
  GET_MAIN_CATEGORY,
  GET_MEDIA_BYID,
  GET_SUB_CATEGORY,
  GET_VENUE_BY_USER,
} from "../../../constants";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function ViewEntertainer() {
  const location = useLocation();
  const navigate = useNavigate();
  let user = location.state;

  const [entertainers, setEntertainers] = useState([]);
  let [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headshoturl, setHeadshoturl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        if (user?.role) {
          // Fetch entertainer details
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}${GET_ENTERTAINERS_BYID}${user.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const fetchedEntertainers = response.data.records;
          setEntertainers(fetchedEntertainers);

          if (
            fetchedEntertainers.length > 0 &&
            fetchedEntertainers[0].category
          ) {
            const { category, specific_category } = fetchedEntertainers[0];

            const [categoryResponse, subCategoryResponse] = await Promise.all([
              axios.get(
                `${import.meta.env.VITE_API_URL}${GET_CATEGORY_BYID}${Number(
                  category
                )}`,
                { headers: { Authorization: `Bearer ${token}` } }
              ),
              axios.get(
                `${import.meta.env.VITE_API_URL}${GET_CATEGORY_BYID}${Number(
                  specific_category
                )}`,
                { headers: { Authorization: `Bearer ${token}` } }
              ),
            ]);

            // Extract category and sub-category names
            const updatedEntertainer = {
              ...fetchedEntertainers[0],
              category: categoryResponse.data.name,
              specific_category: subCategoryResponse.data.name,
            };

            setEntertainers([updatedEntertainer]);
          }

          setId(user.id);
        } else {
          setEntertainers([user]);

          if (user.category) {
            const [categoryResponse, subCategoryResponse] = await Promise.all([
              axios.get(
                `${import.meta.env.VITE_API_URL}${GET_CATEGORY_BYID}${Number(
                  user.category
                )}`,
                { headers: { Authorization: `Bearer ${token}` } }
              ),
              axios.get(
                `${import.meta.env.VITE_API_URL}${GET_CATEGORY_BYID}${Number(
                  user.specific_category
                )}`,
                { headers: { Authorization: `Bearer ${token}` } }
              ),
            ]);

            // Extract category and sub-category names
            const updatedUser = {
              ...user,
              category: categoryResponse.data.name,
              specific_category: subCategoryResponse.data.name,
            };

            setEntertainers([updatedUser]);
          }
          console.log(user);

          setId(user.user.id);
        }
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);

        if (id) {
          try {
            const mediaRes = await axios.get(
              `${import.meta.env.VITE_API_URL}${GET_MEDIA_BYID}${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (
              mediaRes.data.media.length > 0 &&
              mediaRes.data.media[0].type === "headshot"
            ) {
              setHeadshoturl(mediaRes.data.media[0].url);
            }
          } catch (mediaError) {
            console.error("Failed to fetch media:", mediaError);
          }
        }
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id, user?.role, id]);

  return (
    <>
    <DashLayout/>
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-dark btn-sm d-flex align-items-center"
            >
              <i
                className="fa fa-arrow-left"
                style={{ marginRight: "8px" }}
              ></i>
            </button>

            {loading && <p>Loading data...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Conditional rendering for entertainers */}
            {user?.role ? (
              <>
                <div className="row align-items-center">
                  <div className="col text-start mt-3">
                    <p className="profile-font fw-semibold ">USER DETAILS</p>
                    <hr />
                  </div>
                  <div className="col-auto profile-font">
                    {headshoturl ? (
                      <img
                        src={`${headshoturl}`}
                        alt="User"
                        className="rounded-circle"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row profile-font">
                  <div className="mb-3 col-md-6 col-sm-12">
                    <p>
                      <strong>Name:</strong> {user?.name || " "}
                    </p>
                  </div>

                  <div className="mb-3 col-md-6 col-sm-12">
                    <p>
                      <strong>Email:</strong> {user?.email || " "}
                    </p>
                  </div>

                  <div className="mb-3 col-md-6 col-sm-12">
                    <p>
                      <strong>Phone Number:</strong> {user?.phoneNumber || " "}
                    </p>
                  </div>

                  <div className="mb-3 col-md-6 col-sm-12">
                    <p>
                      <strong>Role:</strong>{" "}
                      <span className="text-capitalize">
                        {user?.role || " "}
                      </span>
                    </p>
                  </div>

                  <div className="mb-3 col-md-6 col-sm-12">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="text-capitalize">
                        {user?.status || " "}
                      </span>
                    </p>
                  </div>
                </div>
                {entertainers.length === 0 ? (
                  <>
                    <p className="profile-font">
                      No entertainer details found for this user.
                    </p>
                    <button
                      className=" btn btn-outline-dark btn-sm float-start gap-2"
                      onClick={() => {
                        navigate("/admin/addentertainer", { state: user });
                      }}
                    >
                      <i className="bi bi-plus"></i> Add Entertainer
                    </button>
                  </>
                ) : (
                  <div className="row profile-font">
                    {entertainers.map((entertainer) => (
                      <div key={entertainer.id} className="col-12">
                        <div className="row">
                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Entertainer Name:</strong>{" "}
                              {entertainer.name || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Phone 1:</strong>{" "}
                              {entertainer.phone1 || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Phone 2:</strong>{" "}
                              {entertainer.phone2 || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Bio:</strong> {entertainer.bio || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Performance Role:</strong>{" "}
                              {entertainer.performanceRole || " "}
                            </p>
                          </div>
                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Category:</strong>{" "}
                              {entertainer.category || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Specific Category:</strong>{" "}
                              {entertainer.specific_category || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Availability:</strong>{" "}
                              {entertainer.availability || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Price Per Event:</strong>{" "}
                              {entertainer.pricePerEvent || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Vaccinated:</strong>{" "}
                              {entertainer.vaccinated ? "Yes" : "No"}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Social Links:</strong>{" "}
                              <a
                                href={entertainer.socialLinks || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {entertainer.socialLinks || " "}
                              </a>
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Created At:</strong>{" "}
                              {new Date(
                                entertainer.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Updated At:</strong>{" "}
                              {new Date(
                                entertainer.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {entertainers.length === 0 ? (
                  <>
                    <p>No entertainer details found for this user.</p>
                    <button
                      className=" btn btn-primary float-end gap-2"
                      onClick={() => {
                        navigate("/admin/addentertainer", { state: user });
                      }}
                    >
                      <i className="bi bi-plus"></i> Add Entertainer
                    </button>
                  </>
                ) : (
                  <div className="row">
                    <div className="row align-items-center">
                      <div className="col text-center"></div>
                      <div className="col-auto">
                        {headshoturl ? (
                          <img
                            src={`${headshoturl}`}
                            alt="User"
                            className="rounded-circle"
                            style={{
                              width: "200px",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {entertainers.map((entertainer) => (
                      <div key={entertainer.id} className="col-12 profile-font">
                        <div className="row mt-3">
                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Entertainer Name:</strong>{" "}
                              {entertainer.name || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Phone 1:</strong>{" "}
                              {entertainer.phone1 || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Phone 2:</strong>{" "}
                              {entertainer.phone2 || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Bio:</strong> {entertainer.bio || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Performance Role:</strong>{" "}
                              {entertainer.performanceRole || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Category:</strong>{" "}
                              {entertainer.category || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Specific Category:</strong>{" "}
                              {entertainer.specific_category || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Availability:</strong>{" "}
                              {entertainer.availability || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Price Per Event:</strong>{" "}
                              {entertainer.pricePerEvent || " "}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Vaccinated:</strong>{" "}
                              {entertainer.vaccinated ? "Yes" : "No"}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Social Links:</strong>{" "}
                              <a
                                href={entertainer.socialLinks || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {entertainer.socialLinks || " "}
                              </a>
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Created At:</strong>{" "}
                              {new Date(
                                entertainer.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="mb-3 col-md-6 col-sm-12">
                            <p>
                              <strong>Updated At:</strong>{" "}
                              {new Date(
                                entertainer.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
