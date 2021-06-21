import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormWrapper } from "../setting.styles";
import Input from "../../../components/uielements/input";

import { Form, Button, Switch, PageHeader, InputNumber } from "antd";
import moment from "moment";

import {
  UpdateBroker,
  CreateBroker,
  brokersSelector,
} from "../../../redux/brokers";

const AddEditBroker = ({}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  const { brokers } = useSelector(brokersSelector);

  useEffect(() => {
    try {
      if (id) {
        const broker = brokers.filter((brker) => brker._id === id)[0];
        form.setFieldsValue({
          clientId: broker.clientId,
          state: broker.state,
          isActive: broker.isActive,
          optionEnable: broker.optionEnable,
          node: broker.node,
          host: broker.host,
          protocolId: broker.protocolId,
          keepAlive: broker.keepAlive,
          reconnectPeriod: broker.reconnectPeriod,
          connectTimeout: broker.connectTimeout,
          userName: broker.userName,
          password: broker.password,
        });
      }
    } catch (error) {
      // history.goBack();
    }
  }, [brokers, form, id, history]);

  const onFinish = async (values) => {
    if (id && id !== "new") {
      const row = await form.validateFields();
      dispatch(UpdateBroker(id, row));
    } else {
      await dispatch(CreateBroker(values));
    }

    history.goBack();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        title="broker entry"
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
          name="clientId"
          rules={[{ required: true, message: "Please input your Name!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Switch disabled />
        </Form.Item>

        <Form.Item
          label="Status"
          name="isActive"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Options Enable"
          name="optionEnable"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Node"
          name="node"
          rules={[{ required: true, message: "Please input your Node!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Node" />
        </Form.Item>

        <Form.Item
          label="Host"
          name="host"
          rules={[{ required: true, message: "Please input your Host!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Host" />
        </Form.Item>

        <Form.Item
          label="Protocol Id"
          name="protocolId"
          rules={[
            { required: true, message: "Please input your Protocol Id!" },
          ]}
          {...formItemLayout}
        >
          <Input placeholder="Protocol Id" />
        </Form.Item>

        <Form.Item
          label="keep Alive(ms)"
          name="keepAlive"
          rules={[{ required: true, message: "Please input your keep Alive!" }]}
          {...formItemLayout}
        >
          <InputNumber min={1} max={5000} defaultValue={3} />
        </Form.Item>

        <Form.Item
          label="Reconnect Period(ms)"
          name="reconnectPeriod"
          rules={[
            { required: true, message: "Please input your Reconnect Period!" },
          ]}
          {...formItemLayout}
        >
          <InputNumber min={1} max={5000} defaultValue={3} />
        </Form.Item>

        <Form.Item
          label="connect Timeout(ms)"
          name="connectTimeout"
          rules={[
            { required: true, message: "Please input your connect Timeout!" },
          ]}
          {...formItemLayout}
        >
          <InputNumber min={1} max={5000} defaultValue={3} />
        </Form.Item>

        <Form.Item
          label="userName"
          name="userName"
          rules={[{ required: false, message: "Please input your userName!" }]}
          {...formItemLayout}
        >
          <Input placeholder="userName" />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: false, message: "Please input your password!" }]}
          {...formItemLayout}
        >
          <Input type="password" placeholder="password" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save
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

export default AddEditBroker;
