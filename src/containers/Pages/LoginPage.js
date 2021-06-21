import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import { Form, Input, Button, Checkbox, PageHeader, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Auth } from "../../service/Auth";

import { useDispatch, useSelector } from "react-redux";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./SignIn.styles";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const LoginPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // window.location = '/dashboard';
    Auth.login(values).then(() => {
      if (Auth.authenticated()) {
        window.location = "/dashboard";
      } else {
        form.resetFields();
        message.error(
          "Check your credentials and network connection then try again"
        );
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  size="large"
                  placeholder="Username"
                  autoComplete="true"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ fontSize: 13 }} />}
                  size="large"
                  placeholder="password"
                  autoComplete="false"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  <IntlMessages id="page.signInButton" />
                </Button>
              </Form.Item>
            </Form>
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/signup">
                <IntlMessages id="page.signInCreateAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
};

export default LoginPage;
