import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";
import HelperText from "../../../components/utility/helper-text";
import {
  DeleteCustomer,
  FetchCustomers,
  customersSelector,
} from "../../../redux/customers";

import { Popconfirm, PageHeader, message, Tag, Button } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";

const Customers = () => {
  const [deleteKey, setdeleteKey] = useState("");
  const dispatch = useDispatch();
  const pathMatch = useRouteMatch();

  const { customers, loading, hasError } = useSelector(customersSelector);
  useEffect(() => {
    dispatch(FetchCustomers());
  }, [dispatch]);

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

  const deleteCustomer = async (customer) => {
    try {
      dispatch(DeleteCustomer(customer));
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
      title: "Name",
      dataIndex: "companyName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.companyName.length - b.companyName.length,
    },
    {
      title: "contact",
      dataIndex: "contactName",
      sorter: (a, b) => a.contactName.length - b.contactName.length,
    },
    {
      title: "Status ",
      dataIndex: "isActive",
      render: (state) => {
        return state ? (
          <Tag color={"green"}>Active</Tag>
        ) : (
          <Tag color={"red"}>Disable</Tag>
        );
      },
      sorter: (a, b) => a.isActive - b.isActive,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Contact",
      dataIndex: "contactName",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Note",
      dataIndex: "note",
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
                  onClick={() => deleteCustomer(record._id)}
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
        <IntlMessages id="sidebar.custumer.pageheader" />
      </PageHeader>

      <Box>
        <div className="isoSettingTableBtn">
          <Link to={`${pathMatch.path}/new`}>
            <Button type="primary" className="mateAddSettingBtn">
              <PlusCircleOutlined />
            </Button>
          </Link>
        </div>
        <CardWrapper title="Customers">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                dataSource={customers.map((item, i) => ({
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

export default Customers;
