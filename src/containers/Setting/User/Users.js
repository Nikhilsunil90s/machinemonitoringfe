import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";

import { DeleteUser, fetchUsers, usersSelector } from "../../../redux/users";
import { Popconfirm, PageHeader, Button, message, Tag } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";

const UsersPage = () => {
  const [deleteKey, setdeleteKey] = useState("");
  const pathMatch = useRouteMatch();

  const dispatch = useDispatch();
  const { users, loading, hasError } = useSelector(usersSelector);
  const user = JSON.parse(localStorage.getItem("profile"));

  // useEffect(() => {
  //   dispatch(fetchUsers({ customer: user.customerId }));
  // }, [dispatch]);

  if (hasError) {
    message.error("Last transaction failed, Please reconfirm!!!");
  }
  const isDeleting = (record) => record._id === deleteKey;

  const deleteRecord = (record) => {
    setdeleteKey(record._id);
  };

  const cancel = () => {
    setdeleteKey("");
  };

  const deleteUser = async (user) => {
    try {
      dispatch(DeleteUser(user));
      setdeleteKey("");
    } catch (errInfo) {
      console.log(errInfo);
    }
  };
  const columns = [
    {
      title: "#",
      dataIndex: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Username ",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (record) => {
        return <p> {record.companyName}</p>;
      },
      sorter: (a, b) =>
        a.customer.companyName.length - b.customer.companyName.length,
    },
    {
      title: "Role ",
      dataIndex: "admin",
      render: (admin) => {
        return admin ? (
          <Tag color={"blue"}>Admin</Tag>
        ) : (
          <Tag color={"orange"}>Viewer</Tag>
        );
      },
    },
    {
      title: "Language ",
      dataIndex: "language",
      sorter: (a, b) => a.username.length - b.username.length,
    },

    {
      title: "",
      dataIndex: "operation",
      colSpan: 1,
      fixed: "right",
      render: (_, record) => {
        const deletable = isDeleting(record);
        return (
          <span style={{ display: "block" }}>
            <Link to={`${pathMatch.path}/${record._id}`}>
              <FormOutlined className="SettingViewBtn" />
            </Link>

            {deletable ? (
              <>
                <a
                  href="javascript:;"
                  onClick={() => deleteUser(record._id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Confirm
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </>
            ) : (
              <Button
                className="SettingDltBtn"
                disabled={deleteKey !== ""}
                onClick={() => deleteRecord(record)}
              >
                <DeleteOutlined className="ion-android-delete" />
              </Button>
            )}
          </span>
        );
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.user.pageheader" />
      </PageHeader>
      <Box>
        <div className="isoSettingTableBtn">
          <Link to={`${pathMatch.path}/new`}>
            <Button type="primary" className="mateAddSettingBtn">
              <PlusCircleOutlined />
            </Button>
          </Link>
        </div>
        <CardWrapper title="users">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                dataSource={users.map((item, i) => ({
                  ...item,
                  key: item._id,
                  count: ++i,
                }))}
                columns={columns}
                pagination={false}
                className="SettingListTable"
              />
            </Scrollbars>
          </div>
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
};

export default UsersPage;

/// GOOD WORKING CODE

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   UpdateUser,
//   DeleteUser,
//   fetchUsers,
//   usersSelector,
// } from "../slices/users";
// import { Link } from "react-router-dom";

// import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";
// import { PlusCircleOutlined } from "@ant-design/icons";

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const UsersPage = () => {
//   const [form] = Form.useForm();
//   const [editingKey, setEditingKey] = useState("");
//   const [deleteKey, setdeleteKey] = useState("");
//   const dispatch = useDispatch();
//   const { users, loading, hasError } = useSelector(usersSelector);
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const isEditing = (record) => record._id === editingKey;
//   const isDeleting = (record) => record._id === deleteKey;

//   const edit = (record) => {
//     form.setFieldsValue({ ...record });
//     setEditingKey(record._id);
//   };

//   const deleteRecord = (record) => {
//     setdeleteKey(record._id);
//   };

//   const cancel = () => {
//     setEditingKey("");
//     setdeleteKey("");
//   };

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       dispatch(UpdateUser(key, row));
//       setEditingKey("");
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };

//   const deleteUser = async (user) => {
//     try {
//       dispatch(DeleteUser(user));
//       setEditingKey("");
//       setdeleteKey("");
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };
//   const columns = [
//     {
//       title: "name",
//       dataIndex: "name",
//       width: "25%",
//       editable: true,
//     },
//     {
//       title: "Username ",
//       dataIndex: "username",
//       width: "15%",
//       editable: true,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       width: "40%",
//       editable: true,
//     },
//     {
//       title: "operation",
//       dataIndex: "operation",
//       colSpan: 2,
//       fixed: "right",
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <a
//               href="javascript:;"
//               onClick={() => save(record._id)}
//               style={{
//                 marginRight: 8,
//               }}
//             >
//               Save
//             </a>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <a disabled={editingKey !== ""} onClick={() => edit(record)}>
//             Edit
//           </a>
//         );
//       },
//     },
//     {
//       // Delete User
//       render: (_, record) => {
//         const deletable = isDeleting(record);
//         return deletable ? (
//           <span>
//             <a
//               href="javascript:;"
//               onClick={() => deleteUser(record._id)}
//               style={{
//                 marginRight: 8,
//               }}
//             >
//               Confirm
//             </a>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <a disabled={deleteKey !== ""} onClick={() => deleteRecord(record)}>
//             Delete
//           </a>
//         );
//       },
//     },
//   ];
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: col.dataIndex === "age" ? "number" : "text",
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });

//   return (
//     <div>
//       <Link to="/users/new" className="Primary">
//         <PlusCircleOutlined style={{ fontSize: "24px", paddingBottom: "15" }} />
//       </Link>
//       <Form form={form} component={false}>
//         <Table
//           components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           bordered
//           dataSource={users}
//           columns={mergedColumns}
//           rowClassName="editable-row"
//           pagination={{
//             onChange: cancel,
//           }}
//         />
//       </Form>
//     </div>
//   );
// };
