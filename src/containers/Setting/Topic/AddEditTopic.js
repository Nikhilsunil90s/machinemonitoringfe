import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormWrapper } from "../setting.styles";
// import Input from "../../../components/uielements/input";

import {
  Input,
  Form,
  Button,
  PageHeader,
  InputNumber,
  Select,
  Checkbox,
} from "antd";

import {
  UpdateTopic,
  CreateTopic,
  topicsSelector,
} from "../../../redux/topics";
import { FetchBrokers, brokersSelector } from "../../../redux/brokers";

const AddEditTopic = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const { Option } = Select;
  const { TextArea } = Input;

  const { topics, loading, hasError } = useSelector(topicsSelector);
  const { brokers } = useSelector(brokersSelector);

  useEffect(() => {
    dispatch(FetchBrokers());
  }, [dispatch]);

  useEffect(() => {
    try {
      if (id) {
        const topic = topics.filter((mc) => mc._id === id)[0];
        form.setFieldsValue({
          name: topic.name,
          linkName: topic.linkName,
          isPub: topic.isPub,
          isActive: topic.isActive,
          qos: topic.qos,
          template: JSON.stringify(topic.template || []),
          displayScreen: topic.displayScreen,
          dataType: topic.dataType,
          messageSize: topic.messageSize,
          device: topic.device._id,
        });
      } else {
        form.setFieldsValue({
          isPub: false,
          isActive: false,
          qos: 0,
          displayScreen: 10,
          messageSize: 1,
        });
      }
    } catch (error) {
      console.log(error);
      // history.goBack();
    }
  }, [topics, form, id, history]);

  const onFinish = async (values) => {
    if (id && id !== "new") {
      const row = await form.validateFields();
      const { template } = row;
      const newRow = { ...values, template: JSON.parse(template) };
      dispatch(UpdateTopic(id, newRow));
    } else {
      await dispatch(CreateTopic(values));
    }
    history.goBack();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const isJsonObj = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
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

  return (
    <FormWrapper>
      <PageHeader
        className="site-page-header"
        title="Topic"
        subTitle={id ? "Update" : "Create"}
      />
      <Form
        form={form}
        {...formItemLayout}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input topic Name!" }]}
        >
          <Input placeholder="Topic Name" />
        </Form.Item>
        <Form.Item
          label="Link name"
          name="linkName"
          rules={[
            {
              required: true,
              message: "Please input topic link Name!",
            },
          ]}
        >
          <Input placeholder="topic link name" />
        </Form.Item>

        <Form.Item
          name="device"
          label="Broker name"
          rules={[{ required: true, message: "Please input broker name!" }]}
          {...formItemLayout}
        >
          <Select placeholder="Broker name">
            {brokers.map((broker) => (
              <Option key={broker._id}>{broker.clientId}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Display Screen"
          name="displayScreen"
          rules={[{ required: true, message: "Please input display Screen!" }]}
          {...formItemLayout}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>
        <Form.Item
          label="Data Type"
          name="dataType"
          rules={[{ required: true, message: "Please input data type!" }]}
          {...formItemLayout}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item
          label="qos"
          name="qos"
          rules={[{ required: true, message: "Please input QOS!" }]}
          {...formItemLayout}
        >
          <InputNumber min={0} max={3} defaultValue={0} />
        </Form.Item>

        <Form.Item
          label="messageSize"
          name="messageSize"
          rules={[{ required: true, message: "Please input message Size!" }]}
          {...formItemLayout}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Publish type"
          name="isPub"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Checkbox />
        </Form.Item>

        <Form.Item
          label="Enable topic"
          name="isActive"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          label="template"
          name="template"
          {...formItemLayout}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (
                  !value ||
                  isJsonObj(value) ||
                  value.lenght === 0 ||
                  value === ""
                ) {
                  return Promise.resolve();
                }

                return Promise.reject("Invalid template check syntax!");
              },
            }),
          ]}
        >
          <TextArea
            autoSize={{ minRows: 3 }}
            placeholder={`[{"a":"1", "b":"2.0", "c":true }]`}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ marginLeft: "1em" }}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default AddEditTopic;
