import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormWrapper } from "../setting.styles";
import Input from "../../../components/uielements/input";
import { Form, Button, Switch, Select, PageHeader } from "antd";

import {
  UpdateMachine,
  CreateMachine,
  machinesSelector,
} from "../../../redux/machines";
import { FetchCustomers, customersSelector } from "../../../redux/customers";

const AddEditMachine = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  let { id } = useParams();
  const { Option } = Select;

  const { machines, loading, hasError } = useSelector(machinesSelector);
  const { customers } = useSelector(customersSelector);

  useEffect(() => {
    dispatch(FetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    try {
      if (id) {
        const machine = machines.filter((mc) => mc._id === id)[0];
        form.setFieldsValue({
          name: machine.name,
          code: machine.code,
          isActive: machine.isActive,
          imageLink: machine.imageLink,
          note: machine.note,
          customer: machine.customer._id,
        });
      }
    } catch (error) {}
  }, [machines, form, id, history]);

  const onFinish = async (values) => {
    if (id && id !== "new") {
      const row = await form.validateFields();
      dispatch(UpdateMachine(id, row));
    } else {
      await dispatch(CreateMachine(values));
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
        title="Machine"
        subTitle={id !== "new" ? "Update" : "Create"}
      />
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Machine Name" />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: false,
              message: "Please input your Machine code!",
            },
          ]}
          {...formItemLayout}
        >
          <Input placeholder="Machine code" />
        </Form.Item>

        <Form.Item
          name="customer"
          label="Customer"
          rules={[{ required: true, message: "Please input customer name!" }]}
          {...formItemLayout}
        >
          <Select placeholder="Customer">
            {customers.map((cust) => (
              <Option key={cust._id}>{cust.companyName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Image Link" name="imageLink" {...formItemLayout}>
          <Input placeholder="Image link" />
        </Form.Item>
        <Form.Item
          label="Note"
          name="note"
          rules={[{ message: "Please input your Note!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Note" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="isActive"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Switch />
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

export default AddEditMachine;
