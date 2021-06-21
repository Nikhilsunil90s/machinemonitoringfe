/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

// import { Form, Input, Button, Checkbox, PageHeader, message } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Auth } from "../../../service/Auth";

import { useDispatch, useSelector } from "react-redux";
import IntlMessages from "../../../components/utility/intlMessages";
import LogInWrapper from "./LoginIn.styles";
import bgImage from "../../../assets/images/Login.png";
import { LockIcon, UserIcon } from '../../../assets/Icons'

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 6,
//     span: 16,
//   },
// };

const LoginPage = () => {
  // const [form] = Form.useForm();
  // const onFinish = (values) => {
  //   // window.location = '/dashboard';
  //   Auth.login(values).then(() => {
  //     if (Auth.authenticated()) {
  //       window.location = "/dashboard";
  //     } else {
  //       form.resetFields();
  //       message.error(
  //         "Check your credentials and network connection then try again"
  //       );
  //     }
  //   });
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <LogInWrapper>
      <div className="container-fluid ">
        <div className="row h-100">

          <div className="col-6 h-100 left-side">
            <img className="w-100 loginImage" src={bgImage} alt="Login_Image" />
          </div>
          <div className="col-6 h-100 right-side ">
            <div className="content">
              <h2 className="mb-5 text-center" >MBK Controls</h2>

              <form className="mt-10">
                <div className="input-group mb-4 mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {UserIcon}
                    </span>
                  </div>
                  <input type="text" className="form-control" placeholder="User Name" />
                </div>

                <div className="input-group mb-4 mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {LockIcon}
                    </span>
                  </div>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>


                <div className="input-group mb-4">
                  <div className="clear-fix w-100">
                    <span className="float-left">
                      <div className="form-group form-check">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" /> Remember me
                        </label>
                      </div>
                    </span>
                    <span className="float-right">
                      <a href="/forgotpassword" style={{ color: 'black' }}>
                      <b>Forgot password?</b>
                      </a>
                    </span>
                  </div>
                </div>

                <div className="button-container text-center">
                  <a type="button" href="/dashboard" className="btn btn-primary">Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LogInWrapper>

    //  <div className="isoLoginContentWrapper">
    //   <div className="isoLoginContent">
    //     <div className="isoLogoWrapper">
    //       <Link to="/dashboard">
    //         <IntlMessages id="page.signInTitle" />
    //       </Link>
    //     </div>
    //     <div className="isoSignInForm">
    //       <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
    //         <Form.Item
    //           name="username"
    //           rules={[
    //             {
    //               required: true,
    //             },
    //           ]}
    //         >
    //           <Input
    //             prefix={<UserOutlined style={{ fontSize: 13 }} />}
    //             size="large"
    //             placeholder="Username"
    //             autoComplete="true"
    //           />
    //         </Form.Item>

    //         <Form.Item
    //           name="password"
    //           rules={[
    //             {
    //               required: true,
    //             },
    //           ]}
    //         >
    //           <Input.Password
    //             prefix={<LockOutlined style={{ fontSize: 13 }} />}
    //             size="large"
    //             placeholder="password"
    //             autoComplete="false"
    //           />
    //         </Form.Item>

    //         <Form.Item name="remember" valuePropName="checked">
    //           <Checkbox>Remember me</Checkbox>
    //           <Link to="/forgotpassword" className="isoForgotPass">
    //             <IntlMessages id="page.signInForgotPass" />
    //           </Link>
    //         </Form.Item>
    //         <Form.Item {...tailLayout}>
    //           <Button type="primary" htmlType="submit">
    //             <IntlMessages id="page.signInButton" />
    //           </Button>
    //         </Form.Item>
    //       </Form> 
    //       <div className="isoCenterComponent isoHelperWrapper">
    //         <Link to="/signup">
    //           <IntlMessages id="page.signInCreateAccount" />
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div> */}

  );
};

export default LoginPage;
