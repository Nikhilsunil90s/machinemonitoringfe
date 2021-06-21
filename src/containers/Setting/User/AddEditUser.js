import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, PageHeader, Select } from "antd";
import { FormWrapper } from "../setting.styles";
import Input from "../../../components/uielements/input";
import Checkbox from "../../../components/uielements/checkbox";
import { FetchCustomers, customersSelector } from "../../../redux/customers";
import { UpdateUser, CreateUser, usersSelector } from "../../../redux/users";

const AddEditUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { users } = useSelector(usersSelector);
  const { customers } = useSelector(customersSelector);
  const { Option } = Select;

  let { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(FetchCustomers({ _id: user.customerId }));
  }, [dispatch]);

  useEffect(() => {
    try {
      if (id) {
        const user = users.filter((usr) => usr._id === id)[0];
        console.log(users);
        form.setFieldsValue({
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          admin: user.admin,
          language: user.language,
          customer: user.customer._id,
        });
      }
    } catch (error) {
      console.log("error");
    }
  }, [users, form, id, history]);

  const languages = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    switch (user.language) {
      case "english":
        return [
          { key: "english", display: "English" },
          { key: "french", display: "French" },
          { key: "spanish", display: "Spanish" },
        ];
      case "french":
        return [
          { key: "english", display: "Anglais" },
          { key: "french", display: "Francais" },
          { key: "spanish", display: "Espagnol" },
        ];
      case "spanish":
        return [
          { key: "english", display: "Inglés" },
          { key: "french", display: "Francés" },
          { key: "spanish", display: "Español" },
        ];

      default:
        return [
          { key: "english", display: "english" },
          { key: "french", display: "French" },
          { key: "spanish", display: "spanish" },
        ];
    }
  };

  const onFinish = async (values) => {
    if (id && id !== "new") {
      const row = await form.validateFields();
      dispatch(UpdateUser(id, row));
    } else {
      await dispatch(CreateUser(values));
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
        title="User entry"
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
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
          {...formItemLayout}
        >
          <Input value={users.name} placeholder="name" />
        </Form.Item>
        <Form.Item
          label="User name"
          name="username"
          rules={[{ required: true, message: "Please input username!" }]}
          {...formItemLayout}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="language" label="language" {...formItemLayout}>
          <Select placeholder="Language">
            {languages().map((lang) => (
              <Option key={lang.key}>{lang.display}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
          {...formItemLayout}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
          {...formItemLayout}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="customer"
          label="customer"
          rules={[{ required: true, message: "Please input customer name!" }]}
          {...formItemLayout}
        >
          <Select placeholder="Customer">
            {customers.map((cust) => (
              <Option key={cust._id}>{cust.companyName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Type user (Admin/Viewer"
          name="admin"
          valuePropName="checked"
          {...formItemLayout}
        >
          <Checkbox />
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

export default AddEditUser;
