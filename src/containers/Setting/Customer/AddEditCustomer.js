import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Switch, PageHeader } from "antd";
import { FormWrapper } from "../setting.styles";
import Input from "../../../components/uielements/input";

import {
  UpdateCustomer,
  CreateCustomer,
  customersSelector,
} from "../../../redux/customers";

const AddEditCustomer = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  const { customers, loading, hasError } = useSelector(customersSelector);

  useEffect(() => {
    try {
      if (id) {
        const customer = customers.filter((cust) => cust._id === id)[0];
        form.setFieldsValue({
          companyName: customer.companyName,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phoneNumber: customer.phoneNumber,
          contactName: customer.contactName,
          emailAddress: customer.emailAddress,
          industryType: customer.industryType,
          isActive: customer.isActive,
          address: customer.address,
          city: customer.city,
          zipCode: customer.zipCode,
          country: customer.country,
        });
      }
    } catch (error) {
      console.log("error");
      // history.goBack();
    }
  }, [customers, form, id, history]);

  const onFinish = async (values) => {
    if (id && id !== "new") {
      const row = await form.validateFields();
      dispatch(UpdateCustomer(id, row));
    } else {
      await dispatch(CreateCustomer(values));
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
        title="Customer entry"
        subTitle={id !== "new" ? "Update" : "Create"}
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
          name="companyName"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input placeholder="Company name" />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ message: "Please input your First Name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ message: "Please input your Last Name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your Phone Number!" },
          ]}
        >
          <Input
            type="tel"
            pattern="^[0-9-+\s()]*$"
            placeholder="Phone Number"
          />
        </Form.Item>
        <Form.Item
          label="Contact Name"
          name="contactName"
          rules={[
            { required: true, message: "Please input your Contact Name!" },
          ]}
        >
          <Input placeholder="Contact Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="emailAddress"
          rules={[
            { required: true, message: "Please input your Email Address!" },
          ]}
        >
          <Input type="email" placeholder="Email Address" />
        </Form.Item>
        <Form.Item
          label="Industry Type"
          name="industryType"
          rules={[{ message: "Please input your Industry Type!" }]}
        >
          <Input placeholder="industry Type" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your Address!" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your City!" }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          label="Zip Code"
          name="zipCode"
          rules={[{ message: "Please input your Zip Code!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Zip Code" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please input your Country!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Country" />
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

          <Button style={{ marginLeft: 10 }} onClick={() => history.goBack()}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default AddEditCustomer;
