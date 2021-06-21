import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";

import {
  DeleteMessage,
  FetchMessages,
  messagesSelector,
} from "../../../redux/messages";
import { Message } from "../../../components/Message";

import { Button, Popconfirm, PageHeader, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const MessagesPage = () => {
  const [deleteKey, setdeleteKey] = useState("");
  const [selectedRowsArray, setSelectedRowsArray] = useState([]);
  const dispatch = useDispatch();
  const { messages, loading, hasError } = useSelector(messagesSelector);
  useEffect(() => {
    dispatch(FetchMessages());
  }, [dispatch]);

  // useEffect(() => {
  //   socket.on("newMessage", (payload) => {
  //     dispatch(IOConnection(payload));
  //   });
  // }, []); //only re-run the effect if new message comes in

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

  const deleteMessage = async (message) => {
    try {
      dispatch(DeleteMessage(message, selectedRowsArray));
      setdeleteKey("");
    } catch (errInfo) {
      console.log(errInfo);
    }
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowsArray,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowsArray([...selectedRows]);
    },
    getCheckboxProps: (record) => {
      return { msgId: record.msgId };
    },
  };

  const columns = [
    {
      title: "#",
      dataIndex: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "ID",
      dataIndex: "msgId",
      sorter: (a, b) => a.msgId - b.msgId,
    },
    {
      title: "Topic name",
      dataIndex: "topic",
      render: (record) => {
        return <p> {record ? record.name : ""}</p>;
      },
      sorter: (a, b) => a.topic.name.length - b.topic.name.length,
    },
    {
      title: "Topic",
      dataIndex: "topic",
      render: (record) => {
        return <p> {record ? record.linkName : ""}</p>;
      },
      sorter: (a, b) => a.topic.linkName.length - b.topic.linkName.length,
    },

    {
      title: "payload",
      dataIndex: "payload",
      render: (record) => <Message message={record} />,
    },

    {
      title: "created",
      dataIndex: "updatedOn",
      sorter: (a, b) => a.updatedOn >= b.updatedOn,
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
            {deletable ? (
              <>
                <a
                  href="javascript:;"
                  onClick={() => deleteMessage(record._id)}
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
            ) : selectedRowsArray.length > 0 ? (
              <Button
                className="SettingDltBtn"
                disabled={deleteKey !== ""}
                onClick={() => deleteRecord(record)}
              >
                <DeleteOutlined className="ion-android-delete" />
              </Button>
            ) : null}
          </span>
        );
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.message.pageheader" />
      </PageHeader>

      <Box>
        <CardWrapper title="Customers">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                bordered
                dataSource={messages.map((item, i) => ({
                  ...item,
                  key: item._id,

                  updatedOn: moment
                    .utc(item.createdAt)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss"),
                  count: ++i,
                }))}
                rowSelection={rowSelection}
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

export default MessagesPage;
