import React, { useEffect, useState } from "react";
import axios from "axios";
import DashLayout from "../DashLayout";
import { ALL_USER, UPDATE_USER_STATUS } from "../../../constants";
import CustomTable from "../../components/CustomTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSideBar from "../../components/Venue/AdminSideBar";
import AddUserModal from "./AddUserModal";
export default function AllUserCopy() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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
     console.log(response.data)
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
      const token = localStorage.getItem('token')
      const body = {
        
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}admin/users`,
        {
          headers:{
            Authorization: `Bearer ${token}` },
          }
        
      );

      if (response.status === 200) {
        // After updating, fetch users again to reflect changes
        fetchusers(pagination.current, pagination.pageSize, search, role);
        toast.success("User status Updated successfully!", { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error)
      toast.error("Error updating status:", error);
    }
  };

  // Define columns
  const columns = [
    {
      title: "S.No",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
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
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/users`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: {
            
          },
        }
      );
  
      if (response.status === 200) {
        // Refresh user list after deletion
        fetchusers(pagination.current, pagination.pageSize, search, role);
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  return (
    <>
      <DashLayout />
      <ToastContainer />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container">
            <p className="profile-font fw-semibold">USER MANAGEMENT</p>
            {error ? (
              <div className="alert alert-danger profile-font">{error}</div>
            ) : (
              <div className="m-2 event-form pt-3">
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
                  className="btn btn-dark btn-sm float-end gap-2 rounded-3 pe-3 ps-3 pt-2 pb-2" style={{fontSize:"12px"}}
                  // onClick={() => {
                  //   navigate("/admin/adduser");
                  // }}
                  onClick={() => setShowModal(true)}
                >
                   Add User
                </button>
                <AddUserModal showModal={showModal} closeModal={() => setShowModal(false)} />

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
          </div>
        </div>
      </div>
    </>
  );
}
