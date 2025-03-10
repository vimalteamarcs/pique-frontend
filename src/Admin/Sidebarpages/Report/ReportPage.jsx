import { useState, useEffect } from "react";
import axios from "axios";
import DashLayout from "../../DashLayout";
import Spinner from "../../../components/Spinner";
import * as XLSX from "xlsx";
import { CURRENCY_SIGN, GET_REPORT } from "../../../../constants";

const ReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_REPORT}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReportData(response.data);
        setFilteredData(response.data); // Initially set to full data
      } catch (err) {
        setError("Failed to fetch report data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to handle date filter change
  const handleDateFilter = (e) => {
    const selectedDate = e.target.value;
    setDateFilter(selectedDate);

    if (!selectedDate) {
      setFilteredData(reportData);
      return;
    }

    const filtered = reportData.filter(
      (event) =>
        new Date(event.startTime).toISOString().split("T")[0] === selectedDate
    );

    setFilteredData(filtered);
  };
  const handleMonthFilter = (e) => {
    const selectedMonth = e.target.value; // "YYYY-MM"
    setMonthFilter(selectedMonth);

    if (!selectedMonth) {
      setFilteredData(reportData);
      return;
    }

    const filtered = reportData.filter((event) => {
      const eventMonth = new Date(event.startTime).toISOString().slice(0, 7); // Extract "YYYY-MM"
      return eventMonth === selectedMonth;
    });

    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    const excelData = filteredData.flatMap((event) =>
      event.bookings.flatMap((booking) =>
        booking.invoices.map((invoice) => ({
          Date: new Date(event.startTime).toLocaleDateString(),
          Time: new Date(event.startTime).toLocaleTimeString(),
          "Entertainer Name": booking.entertainer?.name || "",
          Location: event.venue
            ? `${event.venue.name || " "}, ${event.venue.addressLine1 || ""} ${
                event.venue.addressLine2 || ""
              }`
            : " ",
          "Inv Amt.": invoice.total_amount || "0",
          "Count Amt.": booking.count || " ",
          Confirmation:
            booking.status === "confirmed"
              ? booking.isAcceptedDate
                ? new Date(booking.isAcceptedDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                  })
                : ""
              : "",
          "Invoice Paid Amt.":
            invoice.status === "confirmed" ? invoice.total_with_tax : 0,
          "Invoice Status": invoice.status || " ",
          "Chk#": invoice.invoice_number || " ",
          "Data Dep": invoice.payment_date || " ",
          "Cord Paid Amt.": invoice.total_with_tax || "0",
          "My Chk#": invoice.check_number || " ",
          "Date Sent": invoice.issue_date || " ",
          "Entertainer Status": booking?.isAccepted || " ",
          "Venue Status": booking.status || " ",
        }))
      )
    );

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "Report.xlsx");
  };
  if (error) return <p>{error}</p>;

  return (
    <DashLayout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container-fluid">
            {/* Date Filter Input */}
            <div className="d-flex justify-content-between my-3">
              <div className="d-flex ">
                <div>
                  <label className="me-2 fw-bold">Filter by Date</label>
                  <br />
                  <input
                    type="date"
                    className="form-control w-auto me-2"
                    value={dateFilter}
                    onChange={handleDateFilter}
                  />
                </div>
                <div>
                  <label className="me-2 fw-bold">By Month:</label>
                  <br />
                  <input
                    type="month"
                    className="form-control w-auto"
                    value={monthFilter}
                    onChange={handleMonthFilter}
                  />
                </div>
              </div>
              <button className="btn btn-success" onClick={exportToExcel}>
                Download Excel
              </button>
            </div>

            <div className="table-responsive w-100">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th className="text-nowrap m-2"> Date</th>
                    <th className="text-nowrap m-2"> Time</th>
                    <th className="text-nowrap m-2">Entertainer Name</th>
                    <th className="text-nowrap m-2">Location</th>
                    <th className="text-nowrap m-2">Inv Amt.</th>
                    <th className="text-nowrap m-2">Count Amt.</th>
                    <th className="text-nowrap m-2">Confirmation</th>
                    <th className="text-nowrap m-2">Invoice Paid Amt.</th>
                    <th className="text-nowrap m-2">Invoice Status</th>
                    <th className="text-nowrap m-2">Chk#</th>
                    <th className="text-nowrap m-2">Data Dep</th>
                    <th className="text-nowrap m-2">Cord Paid Amt.</th>
                    <th className="text-nowrap m-2">My Chk#</th>
                    <th className="text-nowrap m-2">Date Sent</th>
                    <th className="text-nowrap m-2">Entertainer Status</th>
                    <th className="text-nowrap m-2">Venue Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((event, index) =>
                    event.bookings.map((booking, bIndex) =>
                      booking.invoices.map((invoice, iIndex) => (
                        <tr key={`${index}-${bIndex}-${iIndex}`}>
                          <td>
                            {new Date(event.startTime).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(event.startTime).toLocaleTimeString()}
                          </td>
                          <td>{booking.entertainer?.name || " "}</td>
                          <td>
                            {event.venue
                              ? `${event.venue.name || " "}, ${
                                  event.venue.addressLine1 || ""
                                } ${event.venue.addressLine2 || ""}`
                              : " "}
                          </td>
                          <td>{CURRENCY_SIGN + invoice.total_amount || "0"}</td>
                          <td>{booking.count || " "}</td>
                          <td>
                            {booking.status === "confirmed"
                              ? booking.isAcceptedDate
                                ? new Date(
                                    booking.isAcceptedDate
                                  ).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                  })
                                : ""
                              : ""}
                          </td>
                          <td>
                            {invoice.status === "confirmed"
                              ? CURRENCY_SIGN +invoice.total_with_tax 
                              : CURRENCY_SIGN + 0}
                          </td>
                          <td>{invoice.status || " "}</td>
                          <td>{invoice.invoice_number || " "}</td>
                          <td>{invoice.payment_date || " "}</td>
                          <td>{CURRENCY_SIGN}{invoice.total_with_tax || "0"}</td>
                          <td>{invoice.check_number || " "}</td>
                          <td>{invoice.issue_date || " "}</td>
                          <td>{booking?.isAccepted || " "}</td>
                          <td>{booking.status || " "}</td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DashLayout>
  );
};

export default ReportPage;
