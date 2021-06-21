import styled from "styled-components";
import { palette } from "styled-theme";
import WithDirection from "../../../library/helpers/rtl";


const ForgotPasswordWrapper = styled.div`
    min-height: 100vh;


    .subText {
      color: #989696
    }

    .container-fluid  {
      min-height: 100vh
    }

    .row  {
      min-height: 100vh
    }

    .col-6  {
      min-height: 100vh
    }

    .left-side {
      background: rgba(33, 150, 243, 0.1);
      align-items: center;
      display: flex;
      text-align: center;
      justify-content: center;

      .forgotImage {
        height: 700px;
        max-width: 500px;
      }
    }

    input {
      background: rgba(196, 196, 196, 0.15);
    }

    .right-side {
      padding: 6% 6%;
      
      .mt-10 {
        margin-top: 70px 
      }
      
    }
    .mt-20 {
        margin-top: 50px
    }
`;

export default WithDirection(ForgotPasswordWrapper);
