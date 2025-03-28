
import { useState, useEffect } from "react";
import axios from "axios";
import DashLayout from "../../DashLayout";
import * as XLSX from "xlsx";
import { GET_REPORT } from "../../../../constants";
import AdminSideBar from "../../../components/Venue/AdminSideBar";
import CustomTable from "../../../components/CustomTable";

const ReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 7));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_REPORT}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: { from, to },
          }
        );
        setReportData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [to, from]);

  useEffect(() => {
    if (from > to) {
      setError("To date cannot be earlier than From date.");
    } else {
      setError(null);
    }
  }, [from, to]);

  const column = [
    {
      title: "Date",
      dataIndex: "event_startTime",
      key: "date",
      render: (text) => {
        const date = new Date(text);
        return `${date.getDate()}-${date.toLocaleString("en-GB", {
          month: "short",
        })}-${date.getFullYear()}`;
      },
    },
    {
      title: "Time",
      dataIndex: "event_startTime",
      key: "time",
      render: (text) => {
        const date = new Date(text);
        return `${date.getHours()}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
      },
    },
    { title: "Event", dataIndex: "event_title", key: "event" },
    { title: "Type", dataIndex: "event_recurring", key: "recurring" },
    { title: "Location", dataIndex: "venue_name", key: "location" },
    { title: "Entertainer", dataIndex: "entertainer_name", key: "ent" },
    {
      title: "Location Confirmation",
      dataIndex: "venue_confirmation_date",
      key: "loc_conf",
      render: (text) => {
        const date = new Date(text);
        return `${date.getDate()}-${date.toLocaleString("en-GB", {
          month: "short",
        })}-${date.getFullYear()}`;
      },
    },
    {
      title: "Entertainer Confirmation",
      dataIndex: "entertainer_confirmation_date",
      key: "ent_conf",
      render: (text) => {
        const date = new Date(text);
        return `${date.getDate()}-${date.toLocaleString("en-GB", {
          month: "short",
        })}-${date.getFullYear()}`;
      },
    },
    {
      title: "Venue Invoice No",
      dataIndex: "venue_invoice_number",
      key: "venue_invoice_number",
    },
    { title: "Amount", dataIndex: "venue_total_amount", key: "amount" },
    {
      title: "Payment Status",
      dataIndex: "venue_invoice_status",
      key: "payment_status",
    },
    {
      title: "Payment Date",
      dataIndex: "venue_payment_date",
      key: "payment_date",
      render: (text) => {
        const date = new Date(text);
        return `${date.getDate()}-${date.toLocaleString("en-GB", {
          month: "short",
        })}-${date.getFullYear()}`;
      },
    },
    {
      title: "Payment Method",
      dataIndex: "venue_payment_method",
      key: "payment_method",
    },
    {
      title: "Ent Invoice",
      dataIndex: "ent_invoice_number",
      key: "ent_invoice",
    },
    { title: "Ent Payment", dataIndex: "ent_total_amount", key: "ent_payment" },
    {
      title: "Ent Payment Status",
      dataIndex: "ent_invoice_status",
      key: "ent_payment_status",
    },
    {
      title: "Ent Payment Date",
      dataIndex: "ent_payment_date",
      key: "ent_payment_date",
      render: (text) => {
        const date = new Date(text);
        return `${date.getDate()}-${date.toLocaleString("en-GB", {
          month: "short",
        })}-${date.getFullYear()}`;
      },
    },
    {
      title: "Ent Payment Method",
      dataIndex: "ent_payment_method",
      key: "ent_payment_method",
    },
  ];

  const exportToExcel = () => {
    const excelData = reportData.map((event, index) => ({
      SrNo: index + 1,
      Date: new Date(event.event_startTime)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase()
        .replace(/\s/g, "-"),
      Time: new Date(event.event_startTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      Event: event.event_title,
      Location: event.venue_name,
      Entertainer: event.entertainer_name,
      "Location Confirmation": new Date(
        event.venue_confirmation_date
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      "Entertainer Confirmation": new Date(
        event.entertainer_confirmation_date
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      "Venue Inv No": event.venue_invoice_number,
      Amount: event.venue_total_amount,
      "Payment Status": event.venue_invoice_status,
      "Payment Date": event.venue_payment_date,
      "Payment Method": event.venue_payment_method,
      "Ent Invoice": event.ent_invoice_number,
      "Ent Payment": event.ent_total_amount,
      "Ent Payment Status": event.ent_payment_status,
      "Ent Payment Date": event.ent_payment_date,
      "Ent Payment Method": event.ent_payment_method,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "Report.xlsx");
  };

  return (
    <div className="container-fluid w-100 p-0">
      <div
        className="position-fixed w-100 top-0 z-1030"
        style={{ backgroundColor: "white" }}
      >
        <DashLayout />
      </div>
      <div className="d-flex mt-5">
        <div
          className="dash-sidebar-container position-fixed vh-100 mt-4"
          style={{ width: "250px", zIndex: 1040 }}
        >
          <AdminSideBar />
        </div>
        <div
          className="dash-profile-container flex-grow-1"
          style={{ marginLeft: "250px" }}
        >
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between my-3">
                <div className="d-flex gap-2">
                  <input
                    type="month"
                    className="form-control w-auto"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <input
                    type="month"
                    className="form-control w-auto"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm h-50 mt-4 ms-3"
                    onClick={exportToExcel}
                  >
                    Download Excel
                  </button>
                </div>
              </div>
              <CustomTable
                columns={column}
                data={reportData}
                pagination={{
                  current: 1,
                  pageSize: 10,
                  total: 20,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;