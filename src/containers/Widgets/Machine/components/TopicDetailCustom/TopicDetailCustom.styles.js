import styled from "styled-components";

const CustomDetailWrapper = styled.div`
    color: #595959;

    .flex-row {
      display: flex;
      justify-content: space-between;
      align-items:  center;
    }

    .text-center {
        text-align: center;
        padding: 10px 5px;
    }

    .footer {
        width: 100%;
        padding: 5px 10px;
        position: absolute;
        bottom: 0;
    }

    .flex-column {
        display: flex;
        color: #595959;
        flex-direction: column;
        justify-content: center;
        align-items:  center;
    }
`;

export {CustomDetailWrapper};