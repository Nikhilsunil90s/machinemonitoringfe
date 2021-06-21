import styled from "styled-components";

const LayoutContentWrapper = styled.div`
  padding: 20px 20px;

  @media only screen and (max-width: 767px) {
    padding: 30px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`;

export { LayoutContentWrapper };
