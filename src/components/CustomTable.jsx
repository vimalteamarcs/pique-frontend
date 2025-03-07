import React from "react";
import { Table, Button, Popconfirm, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function CustomTable({
  data,
  columns,
  onEdit,
  onView,
  onDelete,
  loading,
  pagination,
  onTableChange,
  search,
  onSearchChange,
}) {
  const handleEdit = (record) => {
    if (onEdit) {
      onEdit(record);
    }
  };

  const handleDelete = (record) => {
    if (onDelete) {
      onDelete(record);
    }
  };
  const handleView = (record) => {
    if (onView) {
      onView(record);
    }
  };

  const columnsWithActions = columns.map((col) => {
    if (col.actions) {
      return {
        ...col,
        render: (text, record) => (
          <>
            <Button
              onClick={() => handleView(record)}
              type=""
              size="small"
              style={{ marginRight: 8 }}
              icon={<EyeOutlined />}
            ></Button>
            <Button
              onClick={() => handleEdit(record)}
              type="primary"
              size="small"
              style={{ marginRight: 8 }}
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => handleDelete(record)}
            >
              <Button
                type="danger"
                size="small"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </>
        ),
      };
    }

    return col;
  });

  return (
    <div>
      {/* Search Input */}
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
      </div>

      {/* Data Table */}
      <Table
        columns={columnsWithActions}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={onTableChange} // Triggered on pagination or sorting
        rowKey="id"
        bordered
      />
    </div>
  );
}
