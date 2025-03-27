import React, { useEffect, useState } from "react";
import axios from "axios";
import DashLayout from "../DashLayout";
import CustomTable from "../../components/CustomTable";
import { ALL_ENTERTAINERS, CHANGE_STATUS_ENT, DELETE_ENT_PROFILE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/Venue/AdminSideBar";

export default function AllEntertainer() {
  const navigate = useNavigate();
  const [entertainers, setEntertainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 20, // Records per page
    total: 0, // Total number of records
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEntertainers = async (page, pageSize, search = "") => {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const url = `${import.meta.env.VITE_API_URL}${ALL_ENTERTAINERS}`;
        const response = await axios.get(url, {
          params: {
            page,
            pageSize,
            search,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        if (response.data && response.data.records) {
          setEntertainers(response.data.records); // Update table data
          setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize,
            total: response.data.total, // Update total count
          }));
        }
      } catch (err) {
        setError("Failed to load Entertainers");
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainers(pagination.current, pagination.pageSize, search);
  }, [pagination.current, pagination.pageSize, search]);

  const handleEdit = (record) => {
    console.log(`Edit entertainer with id: ${record.id}`);
    navigate("/admin/editentertainer", { state: record });
  };

  const handleDelete = async (record) => {
    console.log(`Delete entertainer with id: ${record.user.id}`);
    const value = {
      id: Number(record.user.id),
      status: "inactive",
    }
    console.log("value to send", value)
    // Implement the delete logic here
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}${DELETE_ENT_PROFILE}${record.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );

      console.log(response.data); // Log the API response
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleView = async (record) => {
    console.log(record);

    navigate("/admin/viewentertainer", { state: record });
  };

  // Define columns for Table
  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    // },
    // {
    //   title: "Specific Category",
    //   dataIndex: "specific_category",
    //   key: "specific_category",
    // },
    {
      title: "Performance Role",
      dataIndex: "performanceRole",
      key: "performanceRole",
    },
    {
      title: "Price Per Event",
      dataIndex: "pricePerEvent",
      key: "pricePerEvent",
      render: (text) => `$${text}`,
    },
    {
      title: "Vaccinated",
      dataIndex: "vaccinated",
      key: "vaccinated",
      render: (text) => (
        <span>
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      actions: true, // Custom flag to add action buttons
    },
  ];

  return (
    <>
      <DashLayout />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <p className="profile-font fw-semibold">ENTERTAINERS DETAILS</p><hr />

            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <div className="m-2 profile-font">
                <CustomTable
                  data={entertainers}
                  columns={columns}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  loading={loading}
                  pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: false,
                  }}
                  onTableChange={(pagination) => {
                    fetchEntertainers(
                      pagination.current,
                      pagination.pageSize,
                      search
                    );
                  }}
                  search={search}
                  onSearchChange={(value) => {
                    setSearch(value);
                    fetchEntertainers(1, pagination.pageSize, value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
