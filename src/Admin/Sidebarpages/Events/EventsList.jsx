import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashLayout from "../../DashLayout";
import CustomTable from "../../../components/CustomTable";
import { DELETE_EVENT, GET_ALL_EVENTS } from "../../../../constants";
import AdminSideBar from "../../../components/Venue/AdminSideBar";
import { Tooltip } from "antd";


const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchEvents(pagination.current, pagination.pageSize, search);
    console.log(events);
  }, [pagination.current, pagination.pageSize, search, flag]);

  const fetchEvents = async (page, pageSize, search) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${GET_ALL_EVENTS}`,
        {
          params: { page, pageSize, search },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);

      // if (response.data && response.data.records) {
      //   setEvents(response.data.records);
      //   setPagination((prev) => ({ ...prev, total: response.data.total }));
      // }
      if (Array.isArray(response.data.records)) {
        setEvents(response.data.records);
        setPagination((prev) => ({ ...prev, total: response.data.total }));
      } else {
        setEvents([]); // Fallback to an empty array
      }
    } catch (err) {
      setError("Failed to load events");
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    console.log("Edit event:", record);
    navigate("/admin/editevent", { state: record });
  };
  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}${DELETE_EVENT}${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success(
          `Event has been deleted successfully.`,
          {
            autoClose: 1000,
          },
          setFlag(!flag)
        );
      }
    } catch (error) {
      console.error(
        `Failed to delete event with ID ${id}:`,
        error.response?.data || error.message
      );
      toast.error(error.response.message);
    }
  };
  const handleDelete = async (record) => {
    console.log("Delete event:", record);
    deleteEvent(record.id);
  };

  const handleView = (record) => {
    console.log("View event:", record);
    navigate("/admin/viewevent", { state: record });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
    {
      title: "Venue Name",
      dataIndex: "venueName",
      key: "venueName",
      render: (text, record) => (
        <Tooltip title={record.location || "No Location"}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => {
        const startDate = new Date(record.startTime).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        );

        const endDate = new Date(record.endTime).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        return `${startDate} - ${endDate}`;
      },
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: ["startTime", "endTime"],
      render: (_, record) => {
        const start = new Date(record.startTime);
        const end = new Date(record.endTime);
        const durationMs = end - start;

        if (durationMs < 0) return "Invalid Time"; // Handle incorrect data

        // Convert duration to minutes, hours, and days
        const totalMinutes = Math.floor(durationMs / (1000 * 60));
        const days = Math.floor(totalMinutes / (60 * 24));
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
        const minutes = totalMinutes % 60;

        // Construct duration string based on conditions
        if (days > 0) {
          return `${days}d`; // Show only days if duration is 1+ days
        } else {
          let durationStr = "";
          if (hours > 0) durationStr += `${hours}hr `;
          if (minutes > 0) durationStr += `${minutes}m`;
          return durationStr.trim(); // Remove trailing space if empty
        }
      },
    },
    {
      title: "Recurring",
      dataIndex: "recurring",
      key: "recurring",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let badgeClass = "";

        if (status === "unpublished") {
          badgeClass = "bg-unpublished";
        } else if (status === "confirmed") {
          badgeClass = "bg-confirmed";
        } else if (status === "cancelled") {
          badgeClass = "bg-cancelled";
        } else {
          badgeClass = "bg-success text-white";
        }

        return (
          <span
            style={{ fontSize: "10px" }}
            className={`badge text-uppercase text-black ${badgeClass}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  console.log("Table Data:", events);

  return (
    <>
      <DashLayout />
      {/* <h5 className="text-secondary text-center mb-4">Events List</h5> */}
      <ToastContainer />
      <div className="container-fluid w-100 p-0">
        <div className="d-flex mt-0">
          <div className="dash-sidebar-container">
            <AdminSideBar />
          </div>
          <div className="dash-profile-container mb-0">
            <div className="d-flex justify-content-between">
              <p className="fs-6 fw-semibold mb-0 mt-3">EVENTS</p>
              {/* <button
                onClick={() => navigate("/admin/createevent")}
                className="btn btn-outline-dark icon-font float-end d-flex align-items-center m-2 btn-sm"
              >
                <i className="fa fa-add" style={{ marginRight: "8px" }}></i>
                Create Event
              </button> */}
            </div>
            {loading ? (
  <div className="d-flex justify-content-center mt-4">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
) : (
              <CustomTable
                data={events}
                columns={columns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
                // pagination={pagination}
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                }}
                // onTableChange={(pagination) => {
                //   fetchEvents(
                //     pagination.current,
                //     pagination.pageSize,
                //     search
                //   );
                // }}
                onTableChange={(newPagination) => {
                  setPagination((prev) => ({
                    ...prev,
                    current: newPagination.current, // Update current page
                    pageSize: newPagination.pageSize,
                  }));
                }}
                search={search}
                // onSearchChange={(value) => {
                //   setSearch(value);
                //   fetchEvents(1, pagination.pageSize, value);
                // }}
                onSearchChange={(value) => {
                  setSearch(value);
                  setPagination((prev) => ({
                    ...prev,
                    current: 1, // Reset to first page on search
                  }));
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsList;
