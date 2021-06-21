import styled from "styled-components";
import { colorStatus } from "../../Machine.config";

const LabelProgress = styled.div`
  color: ${(props) => {
    switch (props.style.status) {
      case 1:
        return colorStatus.stopped;
      case 2:
        return colorStatus.running;
      case 3:
        return colorStatus.alarm;
      case 4:
        return colorStatus.plannedStop;
      case 9:
        return colorStatus.comError;
      default:
        return colorStatus.default;
    }
  }};
`;

const CustomDetailWrapper = styled.div`
    .flex-row {
      display: flex;
      padding: 0 20px;
      color: #595959;
      justify-content: space-between;
      align-items:  center;
    }

    .flex-column {
        display: flex;
        color: #595959;
        flex-direction: column;
        justify-content: center;
        align-items:  center;
    }

    .footer {
      color: #595959;
      width: 100%;
      padding: 5px 10px;
      position: absolute;
      bottom: 0;
  }
`;

export {LabelProgress, CustomDetailWrapper};