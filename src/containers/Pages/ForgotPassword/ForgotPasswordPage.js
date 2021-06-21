import React from "react";
import ForgotPasswordWrapper from './ForgotPasswordPage.styles';
import bgImage from "../../../assets/images/forgotpassword.png";
import { BackIcon } from "../../../assets/Icons";

const ForgotPasswordPage = () => {
    return (
        <ForgotPasswordWrapper>
            <div className="container-fluid">
                <div className="row h-100">
                <div className="col-6 h-100 left-side">
            <img className="w-100 forgotImage" src={bgImage} alt="ForgotPwd_Image" />
          </div>
          <div className="col-6 h-100 right-side ">
            <div className="content">
              <h2 className="mb-5 text-center">MBK Controls</h2>
              <a href="/" type="button">
                  <span>{BackIcon}</span>
              </a>
              
              <h4 className="mt-20 text-center">
                  Forgot your Password?
              </h4>
              <p className="text-center subText">
                    Enter your email to get OTP Code
              </p>
              <form className="mt-10">
                <div className="input-group mb-4 mt-3">
                  <input type="text" className="form-control inpCol" placeholder="Email" />
                </div>
                <div className="button-container text-center mt-10">
                  <a type="button" href="/verification" className="btn btn-primary">Send</a>
                </div>
              </form>
            </div>
          </div>
                </div>
            </div>
        </ForgotPasswordWrapper>
    )
}

export default ForgotPasswordPage;