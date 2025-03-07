import React, { useEffect, useState } from "react";
import axios from "axios";
import DashLayout from "../DashLayout";
import { ALL_USER, UPDATE_USER_STATUS } from "../../../constants";
import CustomTable from "../../components/CustomTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AllUserCopy() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Track selected rows
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // Track selected status for the dropdown

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  console.log(role);

  // Fetch users from API
  const fetchusers = async (page, pageSize, search, role) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}${ALL_USER}`;
      const response = await axios.get(url, {
        params: { page, pageSize, search, role },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.records) {
        const filteredRecords = response.data.records.filter(
          (record) => record.role === role
        );
        setuserdata(filteredRecords);

        setPagination((prev) => ({
          ...prev,
          current: page,
          pageSize,
          total: response.data.total,
        }));
      }
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchusers(pagination.current, pagination.pageSize, search, role);
  }, [pagination.current, pagination.pageSize, search, role]);

  // Handle table pagination change
  const handleTableChange = (pagination) => {
    fetchusers(pagination.current, pagination.pageSize, search, role);
  };

  // Handle search input
  const handleSearch = (value) => {
    setSearch(value);
    fetchusers(1, pagination.pageSize, value, role);
  };

  // Handle individual row selection
  const handleRowSelect = (id, checked) => {
    setSelectedRowKeys((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  // Handle "Select All"
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(userdata.map((user) => user.id)); // Select all IDs
    } else {
      setSelectedRowKeys([]); // Deselect all
    }
  };

  // Handle status change
  const handleStatusChange = async () => {
    if (selectedRowKeys.length === 0 || !status) {
      return; // Do nothing if no rows are selected or no status is selected
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}${UPDATE_USER_STATUS}`,
        {
          ids: selectedRowKeys, // Pass the selected IDs
          status: status, // Pass the selected status
        }
      );

      if (response.status === 200) {
        // After updating, fetch users again to reflect changes
        fetchusers(pagination.current, pagination.pageSize, search, role);
        toast.success("User status Updated successfully!", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Error updating status:", error);
    }
  };

  // Define columns
  const columns = [
    {
      title: (
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={
            selectedRowKeys.length === userdata.length && userdata.length > 0
          }
        />
      ),
      dataIndex: "id",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => handleRowSelect(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={
            text.toLowerCase() === "pending"
              ? "text-capitalize badge bg-danger"
              : "text-capitalize badge bg-success px-3"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      actions: true,
    },
  ];

  const handleView = async (record) => {
    if (record && record.role && record.role.toLowerCase() === "venue") {
      navigate("/admin/viewvenue", { state: record });
    } else {
      navigate("/admin/viewentertainer", { state: record });
    }
  };
  const handleEdit = async (record) => {
    navigate("/admin/edituser", { state: record });
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}${UPDATE_USER_STATUS}`,
        {
          ids: [record.id],
          status: "inactive",
        }
      );

      if (response.status === 200) {
        // After updating, fetch users again to reflect changes
        fetchusers(pagination.current, pagination.pageSize, search, role);
        console.log("Status updated successfully");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <DashLayout>
      <ToastContainer />
      <h5 className="text-secondary text-center mb-4">Users Details</h5>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="m-2">
          {/* Status Dropdown */}
          {selectedRowKeys.length > 0 && (
            <div className=" d-flex justify-content-end float-center">
              <div className="col-md-3 ">
                <select
                  id="status"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" selected>
                    --Select--
                  </option>
                  <option value="active">Active</option>
                  {/* <option value="inactive">Inactive</option> */}
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-primary"
                  onClick={handleStatusChange}
                >
                  Update Status
                </button>
              </div>
            </div>
          )}

          {/* <button
              className="btn btn-primary float-end gap-2"
              onClick={() => {
                navigate("/viewuser");
              }}
            >
              <i className="bi bi-plus"></i> View User
            </button> */}

          <button
            className="btn btn-primary float-end gap-2"
            onClick={() => {
              navigate("/adduser");
            }}
          >
            <i className="bi bi-plus"></i> Add User
          </button>

          {/* Custom Table Component */}
          <CustomTable
            data={userdata}
            columns={columns}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
            }}
            onTableChange={handleTableChange}
            search={search}
            onSearchChange={handleSearch}
          />
        </div>
      )}
    </DashLayout>
  );
}
