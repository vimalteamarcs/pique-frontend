// import React, { useState } from "react";
// import { Table, Button, Popconfirm, Input, Select, Modal } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// const { Option } = Select;

// export default function CustomTable({
//   data,
//   columns,
//   onEdit,
//   onView,
//   onDelete,
//   loading,
//   pagination,
//   onTableChange,
//   search,
//   onSearchChange,
// }) {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   const handleEdit = (record) => {
//     if (onEdit) {
//       onEdit(record);
//     }
//   };

//   // const handleDelete = (record) => {
//   //   if (onDelete) {
//   //     onDelete(record);
//   //   }
//   // };
//   const handleView = (record) => {
//     if (onView) {
//       onView(record);
//     }
//   };

//   const handleDeleteClick = (record) => {
//     setSelectedRecord(record);
//     setIsModalVisible(true);
//   };

//   const handleConfirmDelete = () => {
//     if (onDelete && selectedRecord) {
//       onDelete(selectedRecord);
//     }
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//   };

//   const columnsWithActions = columns.map((col) => {
//     if (col.actions) {
//       return {
//         ...col,
//         render: (text, record) => (
//           <>
//             <Button
//               onClick={() => handleView(record)}
//               type=""
//               size="small"
//               style={{ marginRight: 3 }}
//               icon={<EyeOutlined />}
//             ></Button>
//             <Button
//               onClick={() => handleEdit(record)}
//               type=""
//               size="small"
//               style={{ marginRight: 3 }}
//               icon={<EditOutlined />}
//             ></Button>
//             {/* <Popconfirm
//               title="Are you sure delete this item?"
//               onConfirm={() => handleDeleteClick(record)}
//             >
//               <Button
//                 type="danger"
//                 size="small"
//                 icon={<DeleteOutlined />}
//               ></Button>
//             </Popconfirm> */}
//             <Button
//               onClick={() => handleDeleteClick(record)}
//               type=""
//               size="small"
//               icon={<DeleteOutlined />}
//             ></Button>
//           </>
//         ),
//       };
//     }

//     return col;
//   });

//   return (
//     <div style={{ borderRadius: "10px", padding: "0px" }}>
//       {/* Search Input */}
//       <div
//         style={{ borderRadius: "10px" }}
//         className="d-flex float-start m-2"
//       >
//         <Input
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           style={{ width: 200 }}
//           prefix={<SearchOutlined />}
//         />
//       </div>

//       {/* Data Table */}
//       <div className="event-form p-2">
//         <Table
//           columns={columnsWithActions}
//           dataSource={data}
//           pagination={pagination}
//           loading={loading}
//           onChange={onTableChange} // Triggered on pagination or sorting
//           rowKey="id"
//         />
//       </div>

//       <Modal
//         className="w-25"
//         title={
//           <div style={{ textAlign: "center" }}>
//             Confirm Delete
//           </div>
//         }
//         open={isModalVisible}
//         onOk={handleConfirmDelete}
//         onCancel={handleCancel}
//         okText="Yes, Delete"
//         cancelText="Cancel"
//         okType="danger"
//         centered
//         footer={[
//           <button
//             key="delete"
//             onClick={handleConfirmDelete}
//             className="btn btn-sm btn-danger"
//           >
//             Yes, Delete
//           </button>,
//           <button
//             key="cancel"
//             onClick={handleCancel}
//             className="btn btn-sm btn-secondary ms-2"
//           >
//             Cancel
//           </button>,
//         ]}
//       >
//         <p className="text-center">
//           Are you sure you want to delete this item?
//         </p>
//       </Modal>
//     </div>
//   );
// }







// import React, { useState } from "react";

// export default function CustomTable({
//   data,
//   columns,
//   onEdit = null,
//   onView = null,
//   onDelete,
//   search,
//   onSearchChange,
//   pagination,
//   onTableChange,
// }) {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);



//   const handleDeleteClick = (record) => {
//     setSelectedRecord(record);
//     setIsModalVisible(true);
//   };

//   const confirmDelete = () => {
//     if (onDelete && selectedRecord) {
//       onDelete(selectedRecord);
//     }
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//   };

//   const hasActions = Boolean(onEdit || onView || onDelete);
//   const tableColumns = [{ title: "Sr. No.", key: "srNo" }, ...columns];
//   if (hasActions) {
//     tableColumns.push({ title: "Actions", key: "actions" });
//   }

//   // Pagination logic
//   const { current, pageSize = 10, total } = pagination;
//   const paginatedData = data.slice(
//     (current - 1) * pageSize,
//     current * pageSize
//   );

//   return (
//     <div className="p-2">
//       <div className="d-flex float-start m-2">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           className="form-control w-100"
//         />
//       </div>

//       <div className="event-form p-2">
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               {tableColumns.map((col, index) => (
//                 <th key={index}>{col.title}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((record, index) => (
//               <tr key={index}>
//                 <td>{(current - 1) * pageSize + index + 1}</td>
//                 {columns.map((col, colIndex) => (
//                   <td key={colIndex}>
//                     {col.render
//                       ? col.render(record[col.dataIndex], record)
//                       : record[col.dataIndex] ?? "N/A"}
//                   </td>
//                 ))}
//                 {hasActions && (
//                   <td className="text-center">
//                     <div className="d-flex justify-content-center gap-1">
//                       {onView && (
//                         <button
//                           className="btn btn-sm btn-primary p-1"
//                           onClick={() => onView(record)}
//                           title="View"
//                         >
//                           <i className="fas fa-eye"></i>
//                         </button>
//                       )}
//                       {onEdit && (
//                         <button
//                           className="btn btn-sm btn-warning p-1"
//                           onClick={() => onEdit(record)}
//                           title="Edit"
//                         >
//                           <i className="fas fa-edit"></i>
//                         </button>
//                       )}
//                       {onDelete && (
//                         <button
//                           className="btn btn-sm btn-danger p-1"
//                           onClick={() => handleDeleteClick(record)}
//                           title="Delete"
//                         >
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//        {/* Confirmation Modal */}
// {/* Confirmation Modal */}
// {isModalVisible && (
//   <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//     <div className="modal-dialog modal-dialog-centered" role="document">
//       <div className="modal-content">
//         <div className="modal-header d-flex">
//           <h5 className="modal-title">Confirm Deletion</h5>
//           <button 
//             type="button" 
//             className="btn ms-auto close" 
//             onClick={() => setIsModalVisible(false)}
//           >
//             <span>&times;</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           {selectedRecord && (
//             <p>
//               Are you sure you want to delete <strong>{selectedRecord.name || ""}</strong>?
//             </p>
//           )}
//         </div>
//         <div className="modal-footer">
//           <button 
//             type="button" 
//             className="btn btn-secondary" 
//             onClick={() => setIsModalVisible(false)}
//           >
//             Cancel
//           </button>
//           <button 
//             type="button" 
//             className="btn btn-danger" 
//             onClick={confirmDelete}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}


// {/* Backdrop for Modal */}
// {isModalVisible && <div className="modal-backdrop fade show"></div>}


//       {/* Pagination Controls */}
//       <div className="d-flex justify-content-center mt-3">
//         <button
//           className="btn btn-sm btn-secondary mx-1"
//           disabled={current === 1}
//           onClick={() =>
//             onTableChange({ current: current - 1, pageSize, total })
//           }
//         >
//           <i className="fas fa-arrow-left"></i>
//         </button>
//         <span className="mx-2">
//           Page {current} of {Math.ceil(total / pageSize)}
//         </span>
//         <button
//           className="btn btn-sm btn-secondary mx-1"
//           disabled={current === Math.ceil(total / pageSize)}
//           onClick={() =>
//             onTableChange({ current: current + 1, pageSize, total })
//           }
//         >
//           <i className="fas fa-arrow-right"></i>
//         </button>
//       </div>
//     </div>
//   );
// }


//88888888888888888888888888888
// import React, { useEffect, useRef } from "react";
// import ReactDOMServer from "react-dom/server";
// import $ from "jquery";
// import "datatables.net-bs5"; // Bootstrap 5 styling
// import "datatables.net-responsive-bs5"; // Optional: Makes table responsive



// export default function CustomTable({
//   data = [],
//   columns = [],
//   onEdit,
//   onView,
//   onDelete,
//   pagination = { current: 1, pageSize: 10, total: 0 },
//   onTableChange,
// }) {
//   const tableRef = useRef(null);
//   const tableInstance = useRef(null);

//   useEffect(() => {
//     if ($.fn.DataTable.isDataTable(tableRef.current)) {
//       tableInstance.current.destroy();
//     }

//     console.log("Columns:", columns);
//     console.log("Data:", data);

//     tableInstance.current = $(tableRef.current).DataTable({
//       destroy: true,
//       data: data,
//       columns: [
//         {
//           title: "SrNo",
//           data: null,
//           render: (data, type, row, meta) => meta.row + 1,
//         },
//         ...columns.map((col) => ({
//           title: typeof col.title === "string" ? col.title : "Untitled", // Ensure title is a string
//           data: col.dataIndex || null, // Ensure valid data mapping
//           render: col.render
//             ? (data, type, row) =>
//               ReactDOMServer.renderToString(col.render(data, row) || "")
//             : (data) => (data ? data.toString() : ""), // Convert to string if needed
//         })),
//         {
//           title: "Actions",
//           data: null,
//           orderable: false,
//           render: function (data, type, row) {
//             return `
//               <button class="btn btn-outline-primary btn-view"><i class="fas fa-eye"></i></button>
//               <button class="btn btn-outline-primary btn-edit"><i class="fas fa-edit"></i></button>
//               <button class="btn btn-outline-primary btn-delete"><i class="fas fa-trash"></i></button>
//             `;
//           },
//         },
//       ],
//       paging: true,
//       searching: true,
//       ordering: true,
//       pageLength: pagination.pageSize,
//       displayStart: (pagination.current - 1) * pagination.pageSize,
//       drawCallback: function (settings) {
//         const newPage =
//           Math.ceil(settings._iDisplayStart / settings._iDisplayLength) + 1;
//         if (pagination.current !== newPage) {
//           onTableChange({
//             current: newPage,
//             pageSize: settings._iDisplayLength,
//             total: pagination.total,
//           });
//         }
//       },
//     });

//     // Event bindings for actions
//     $(tableRef.current).on("click", ".btn-view", function () {
//       const rowData = tableInstance.current.row($(this).parents("tr")).data();
//       onView(rowData);
//     });

//     $(tableRef.current).on("click", ".btn-edit", function () {
//       const rowData = tableInstance.current.row($(this).parents("tr")).data();
//       onEdit(rowData);
//     });

//     $(tableRef.current).on("click", ".btn-delete", function () {
//       const rowData = tableInstance.current.row($(this).parents("tr")).data();
//       onDelete(rowData);
//     });

//     return () => {
//       if (tableInstance.current) {
//         tableInstance.current.destroy();
//       }
//     };
//   }, [data, columns, pagination]);

//   return (
//     <div>
//       <table
//         ref={tableRef}
//         className="display table table-bordered table-hover table-bordered1 table-hover dataTableUI"
//       />
//     </div>
//   );
// }




import React, { useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import $ from "jquery";
import "datatables.net-bs5"; // Bootstrap 5 styling
import "datatables.net-responsive-bs5"; // Optional: Makes table responsive


export default function CustomTable({
  data = [],
  columns = [],
  onEdit,
  onView,
  onDelete,
  pagination = { current: 1, pageSize: 10, total: 0 },
  onTableChange,
}) {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      tableInstance.current.destroy();
    }

    tableInstance.current = $(tableRef.current).DataTable({
      destroy: true,
      data: data,
      columns: [
        {
          title: "SrNo",
          data: null,
          render: (data, type, row, meta) => meta.row + 1,
        },
        ...columns.map((col) => ({
          title: typeof col.title === "string" ? col.title : "Untitled",
          data: col.dataIndex || null,
          render: col.render
            ? (data, type, row) =>
              ReactDOMServer.renderToString(col.render(data, row) || "")
            : (data) => (data ? data.toString() : ""),
        })),
        {
          title: "Actions",
          data: null,
          orderable: false,
          render: function (data, type, row) {
            return `
              <div class="btn-group">
          <button class="btn btn-outline-primary btn-view"><i class="fas fa-eye"></i></button>
          <button class="btn btn-outline-primary btn-edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-outline-primary btn-delete"><i class="fas fa-trash"></i></button>
        </div>`;
          },
        },
      ],
      paging: true,
      searching: true,
      ordering: true,
      pageLength: pagination.pageSize,
      displayStart: (pagination.current - 1) * pagination.pageSize,
      drawCallback: function (settings) {
        const newPage =
          Math.ceil(settings._iDisplayStart / settings._iDisplayLength) + 1;
        if (pagination.current !== newPage) {
          onTableChange({
            current: newPage,
            pageSize: settings._iDisplayLength,
            total: pagination.total,
          });
        }
      },
    });

    // Apply custom styles after DataTables applies its default styles
    setTimeout(() => {
      $('.dataTableUI').removeAttr('style');
    }, 100);

    // Event bindings for actions
    $(tableRef.current).on("click", ".btn-view", function () {
      const rowData = tableInstance.current.row($(this).parents("tr")).data();
      onView(rowData);
    });

    $(tableRef.current).on("click", ".btn-edit", function () {
      const rowData = tableInstance.current.row($(this).parents("tr")).data();
      onEdit(rowData);
    });

    $(tableRef.current).on("click", ".btn-delete", function () {
      const rowData = tableInstance.current.row($(this).parents("tr")).data();
      onDelete(rowData);
    });

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
      }
    };
  }, [data, columns, pagination]);


  return (
    <div>
      <table
        ref={tableRef}
        className="display table dataTableUI"
      />
    </div>
  );
}