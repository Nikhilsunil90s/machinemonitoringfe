import styled from 'styled-components';
import { palette } from 'styled-theme';

const WidgetWrapper = styled.div`

  

  .heading {
    font-weight: 500;
    font-size: 24px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #000000;
  }

  .graphBlock {
    position: absolute;
    width: 460px;
    height: 400px;
    top: 16px;
    background: #FFFFFF;
    border-radius: 15px;
  }

  .font-25 {
    font-size: 25px
  }

  .bg-custom-light {
    background: #E3F2FD;
    border-radius: 3px;
  }

  .nav {
    display: inline-flex
  }
  .nav-tabs .nav-item {
    margin-bottom: -1px;
    background: #E9E9E9;
    border-radius: 5px;
    margin-left: 10px;
  }
  .nav-pills .nav-link {
    color: #989696
  }
  .nav-link.active {
    color: white
  }
`;


export { WidgetWrapper};
