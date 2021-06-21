import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";
import { FormWrapper } from "../setting.styles";

import { Form, Button, Select, PageHeader } from "antd";
import {
  FetchMachines,
  ConnectMachine,
  DisconnectMachine,
  machinesSelector,
} from "../../../redux/machines";

import { FetchTopics, topicsSelector } from "../../../redux/topics";
import moment from "moment";

const ConnectTopicMachine = ({ match }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  let { id } = useParams();

  const [opType, setOptype] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState();
  const [selectedTopicId, setSelectedTopicId] = useState();
  const [machineData, setMachineData] = useState();
  const [data, setData] = useState([]);

  const { machines, loading, hasError } = useSelector(machinesSelector);
  const { topics, topicloading, topicshasError } = useSelector(topicsSelector);

  useEffect(() => {
    dispatch(FetchMachines());
    dispatch(FetchTopics());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const topicByMachineData = () => {
    const machine = machines.filter((mc) => mc._id === id)[0];
    if (machine !== undefined) {
      setMachineData(machine);
      setData(machine.topics);
    }
  };

  useEffect(() => {
    try {
      topicByMachineData();
    } catch (error) {
      // history.push("/machines");
    }
  }, [topicByMachineData]);

  const freeTopics = () => {
    if (id) {
      const mcTopic = topics.filter((tp) => tp.isAssigned === false);
      setSelectedTopics(mcTopic);
      setOptype(false);
      setSelectedTopicId(null);
    }
  };
  useEffect(() => {
    try {
      freeTopics();
    } catch (error) {
      history.push("/machines");
    }
  }, [topics]);

  const onFinish = async () => {
    if (id && selectedTopicId) {
      if (opType) {
        dispatch(DisconnectMachine(id, selectedTopicId));
      } else {
        dispatch(ConnectMachine(id, selectedTopicId));
      }
    }
    form.resetFields();
    // wait to get data from API
    setTimeout(() => {
      dispatch(FetchTopics());
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onchangeOpType = () => {
    form.resetFields();
    setOptype(!opType);
    let McTopic;
    if (opType) {
      McTopic = topics.filter((tp) => tp.isAssigned === false);
    } else {
      McTopic = topics.filter((tp) => tp.isAssigned === true);
    }
    setSelectedTopics(McTopic);
    setSelectedTopicId(null);
  };

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

  const handleSelectChange = (value) => setSelectedTopicId(value);

  const columns = [
    {
      title: "#",
      dataIndex: "count",
    },
    {
      title: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Link Name",
      dataIndex: "linkName",
      sorter: (a, b) => a.linkName - b.linkName,
    },
    {
      title: "update",
      dataIndex: "createdOn",
      sorter: (a, b) => a.createdOn - b.createdOn,
    },
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <LayoutWrapper>
      <PageHeader
        className="site-page-header"
        title={`Connect topic to machine: ${
          machineData ? machineData.name : ""
        } `}
      />
      <Box>
        <CardWrapper title="Machines">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                dataSource={data.map((item, i) => ({
                  ...item,
                  key: item._id,
                  createdOn: moment
                    .utc(item.createdAt)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss"),
                  count: ++i,
                }))}
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
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="accent" onClick={onchangeOpType}>
                      {opType ? "Disconnect" : "Connect"}
                    </Button>
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="Topic Name"
                    rules={[
                      { required: false, message: "Please input topic name !" },
                    ]}
                    {...formItemLayout}
                  >
                    <span>
                      <Select placeholder="Topic" onChange={handleSelectChange}>
                        {selectedTopics
                          ? selectedTopics.map((tp) => (
                              <Option key={tp._id}>{tp.name}</Option>
                            ))
                          : null}
                      </Select>
                    </span>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    {selectedTopicId ? (
                      <Button type="primary" htmlType="submit">
                        Save
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

export default ConnectTopicMachine;
