import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";
import { FormWrapper } from "../setting.styles";

import { Form, Input, Button, PageHeader, Popconfirm, message } from "antd";
import { MinusOutlined } from "@ant-design/icons";

import {
  PublishTopic,
  FetchTopics,
  topicsSelector,
} from "../../../redux/topics";
import {
  FetchMessages,
  DeleteMessage,
  messagesSelector,
} from "../../../redux/messages";
import { Message } from "../../../components/Message";

const TopicDetailPage = ({ match }) => {
  const [form] = Form.useForm();
  const [deleteKey, setdeleteKey] = useState("");
  const [data, setData] = useState("");
  const [selectedRowsArray, setSelectedRowsArray] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { topics, loading, hasError } = useSelector(topicsSelector);
  const { messages } = useSelector(messagesSelector);

  let { id } = useParams();

  const { TextArea } = Input;

  useEffect(() => {
    try {
      dispatch(FetchMessages({ topic: id }));
      dispatch(FetchTopics());
    } catch (error) {}
  }, [dispatch, id]);

  useEffect(() => {
    try {
      const topic = topics.filter((tp) => tp._id === id)[0];
      if (topic) setData(topic);
    } catch (error) {}
  }, [topics, id]);

  const onFinish = async (values) => {
    if (id) {
      const row = await form.validateFields();
      try {
        dispatch(PublishTopic(data.device._id, id, JSON.parse(row.name)));
        dispatch(FetchMessages({ topic: id }));
        form.resetFields();
      } catch (e) {
        message.error("Error on entered message");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const cancel = () => {};
  const deleteMessage = async (message) => {
    try {
      dispatch(DeleteMessage(message, selectedRowsArray));
      setdeleteKey("");
    } catch (errInfo) {
      console.log(errInfo);
    }
  };

  const deleteRecord = (record) => {
    setdeleteKey(record._id);
  };

  if (hasError) {
    message.error("Last transaction failed, Please reconfirm!!!");
  }

  const isDeleting = (record) => record._id === deleteKey;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowsArray,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowsArray}`,
        "selectedRows: ",
        selectedRows
      );
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
    },
    {
      title: "Msg#",
      dataIndex: "msgId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.msgId - b.msgId,
    },

    {
      title: "payload",
      dataIndex: "payload",
      render: (record, idx) => <Message message={record} />,
    },
    {
      title: "created",
      dataIndex: "createdOn",

      sorter: (a, b) => a.createdOn >= b.createdOn,
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
              <a
                disabled={deleteKey !== ""}
                onClick={() => deleteRecord(record)}
              >
                <MinusOutlined style={{ fontSize: "25px", color: "#ff0000" }} />
              </a>
            ) : null}
          </span>
        );
      },
    },
  ];
  return (
    <LayoutWrapper>
      <PageHeader
        className="site-page-header"
        title={`Topic details : ${data.name}, link: ${data.linkName}`}
        subTitle={data.isPub ? " Publish" : "Subscribe"}
      />
      <Box>
        <CardWrapper title="Machines">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                bordered
                dataSource={messages.map((item, i) => ({
                  ...item,
                  key: item._id,
                  createdOn: moment
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
              <hr />
              <FormWrapper>
                <Form
                  form={form}
                  layout="horizontal"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  size="large"
                >
                  {data.isPub ? (
                    <Form.Item
                      label="Message:"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input JSON message to publish!",
                        },
                      ]}
                      {...formItemLayout}
                    >
                      <TextArea
                        rows={4}
                        placeholder={`{"a":"1", "b":"2.0", "c":true }`}
                      />
                    </Form.Item>
                  ) : null}
                  <Form.Item {...tailFormItemLayout}>
                    {data.isPub ? (
                      <Button type="primary" htmlType="submit">
                        Publish
                      </Button>
                    ) : null}
                    <Button
                      style={{ marginLeft: "1em" }}
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </FormWrapper>
            </Scrollbars>
          </div>
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
};

export default TopicDetailPage;
