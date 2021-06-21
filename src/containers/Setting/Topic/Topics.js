import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";

import {
  DeleteTopic,
  FetchTopics,
  topicsSelector,
} from "../../../redux/topics";

import { Button, Popconfirm, PageHeader, message, Tag } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  SendOutlined,
} from "@ant-design/icons";

const TopicsPage = () => {
  const [deleteKey, setdeleteKey] = useState("");
  const dispatch = useDispatch();
  const pathMatch = useRouteMatch();

  const { topics, loading, hasError } = useSelector(topicsSelector);
  useEffect(() => {
    dispatch(FetchTopics());
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

  const deleteTopic = async (topic) => {
    try {
      dispatch(DeleteTopic(topic));
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
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Link",
      dataIndex: "linkName",
      sorter: (a, b) => a.linkName.length - b.linkName.length,
    },
    {
      title: "Broker",
      dataIndex: "device",
      render: (record) => {
        return record ? <p> {record.clientId}</p> : null;
      },
      sorter: (a, b) => a.device.clientId.length - b.device.clientId.length,
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
      title: "Type ",
      dataIndex: "isPub",
      render: (isPub) => {
        return isPub ? (
          <Tag color={"green"}>Publish </Tag>
        ) : (
          <Tag color={"blue"}> Subscribe</Tag>
        );
      },
      sorter: (a, b) => a.isPub - b.isPub,
    },
    {
      title: "QOS",
      dataIndex: "qos",
    },
    {
      title: "Message Size",
      dataIndex: "messageSize",
      sorter: (a, b) => a.messageSize - b.messageSize,
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
                  onClick={() => deleteTopic(record._id)}
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

            <Link to={`${pathMatch.path}/topicdetail/${record._id}`}>
              <SendOutlined className="SettinConnectBtn" />
            </Link>
          </span>
        );
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.topic.pageheader" />
      </PageHeader>

      <Box>
        <div className="isoSettingTableBtn">
          <Link to={`${pathMatch.path}/new`}>
            <Button type="primary" className="mateAddSettingBtn">
              <PlusCircleOutlined />
            </Button>
          </Link>
        </div>
        <CardWrapper title="Topics">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                dataSource={topics.map((item, i) => ({
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

export default TopicsPage;
