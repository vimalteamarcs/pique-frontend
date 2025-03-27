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







import React, { useState } from "react";

export default function CustomTable({
  data,
  columns,
  onEdit,
  onView,
  onDelete,
  search,
  onSearchChange,
}) {
  // console.log("columns", columns)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && selectedRecord) {
      onDelete(selectedRecord);
    }
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  // Add Sr. No. Column
  const tableColumns = [
    { title: "SrNo", key: "srNo" }, // Auto-increment column
    ...columns,
    { title: "Actions", key: "actions" },
  ];

  return (
    <div className="p-2">
      {/* Search Input */}
      <div className="d-flex float-start m-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-control w-100"
        />
      </div>

      {/* Data Table */}
      <div className="event-form p-2">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {tableColumns.map((col, index) => (
                <th key={index}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render ? col.render(record[col.dataIndex], record) : record[col.dataIndex]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => onView(record)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => onEdit(record)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(record)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalVisible && (
  <div
    className="modal fade show d-flex align-items-center justify-content-center"
    style={{
      position: "fixed",
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      zIndex: 1050,
    }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center">Confirm Delete</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCancel}
          ></button>
        </div>
        <div className="modal-body text-center">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-sm btn-danger"
            onClick={handleConfirmDelete}
          >
            Yes, Delete
          </button>
          <button
            className="btn btn-sm btn-secondary ms-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
