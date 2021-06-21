import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";

import {
  DeleteBroker,
  FetchBrokers,
  brokersSelector,
} from "../../../redux/brokers";

import { Button, Popconfirm, PageHeader, message, Tag } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";

const BrokersPage = () => {
  const [deleteKey, setdeleteKey] = useState("");
  const dispatch = useDispatch();
  const pathMatch = useRouteMatch();

  const { brokers, loading, hasError } = useSelector(brokersSelector);
  useEffect(() => {
    dispatch(FetchBrokers());
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

  const deleteBroker = async (broker) => {
    try {
      dispatch(DeleteBroker(broker));
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
      dataIndex: "clientId",
      sorter: (a, b) => a.clientId.length - b.clientId.length,
    },
    {
      title: "State ",
      dataIndex: "state",
      render: (state) => {
        return state ? (
          <Tag color={"green"}>Online</Tag>
        ) : (
          <Tag color={"blue"}>Offline</Tag>
        );
      },
      sorter: (a, b) => a.state - b.state,
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
      title: "Host",
      dataIndex: "host",
      sorter: (a, b) => a.host.length - b.host.length,
    },
    {
      title: "Online",
      dataIndex: "onlineOn",
      sorter: (a, b) => a.onlineOn > b.onlineOn,
    },
    {
      title: "Offline",
      dataIndex: "offlineOn",
      sorter: (a, b) => a.offlineOn > b.offlineOn,
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
                  onClick={() => deleteBroker(record._id)}
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
        <IntlMessages id="sidebar.broker.pageheader" />
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
                size="large"
                bordered
                dataSource={brokers.map((item, i) => ({
                  ...item,
                  key: item._id,
                  count: ++i,
                  onlineOn: moment
                    .utc(item.onlineAt)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss"),
                  offlineOn: moment
                    .utc(item.offlineAt)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss"),
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

export default BrokersPage;
