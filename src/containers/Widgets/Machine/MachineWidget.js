// Libraries
import React, {useState} from "react";
import moment from "moment";
import { Descriptions, Card, Statistic, Avatar, Modal } from "antd";
import { colorStatus } from "./Machine.config";

// Components
import TopicDetailWidget from "../TopicDetail/TopicDetail";
import TopicsWidget from "../Topic/TopicWidget";
import TopicDetailCustom from './components/TopicDetailCustom';
import TopicDetailProduct from './components/TopicDetailProduct';
import TopicDetailDiagnostic from './components/TopicDetailDiagnostic';

// Styles
import { MachineWidgetWrapper, MachineModalWrapper, MachineStatus, Status} from "./MachineWidget.styles";

export default function (props) {
  // Props
  const {width, status, name, lastUpdate, code, machine, topic} = props;
  
  // State 
  const [isOpenModal, setOpenModal] = useState(false);

  let prodValue;

  if(topic.message && topic.message.payload) {
      prodValue = Object.getOwnPropertyNames(topic.message.payload);
  }
  
// if(prodValue) {
//   console.log(topic.message.payload[prodValue][4])
// }

  const widgetStyle = {
    width: width,
    status: status,
  };

  const onClickMachine = () => {
    setOpenModal(true)
  }

  const onOkeModal = () => {
    setOpenModal(false)
  }

  const onCancelModal = () => {
    setOpenModal(false)
  }

  const showRenderTopic = () => {
    switch (topic.dataType) {
      case 1:
        return <TopicDetailProduct topic={topic} status={status} />
      case 3:

        return <TopicDetailCustom />;

      case 5:

        return <TopicDetailDiagnostic topic={topic} status={status} />;
    
      default:
        return <TopicDetailCustom />;
    }
  }

  const showRenderType = () => {
    switch (topic.dataType) {
      case 1:
        return <div>Product</div>
      case 3:
        return <div>Custom</div>
      case 5:
        return <div>Diagnostic</div>
      default:
        return <div>Custom</div>
    }
  }

  const showTime = () => {
    switch (topic.dataType) {
      case 1:
    return <div>{moment(topic.message.payload[prodValue][4] * 1000).format("HH:mm:ss")}</div>
      case 3:
        return null;
      case 5:
        return <div>{moment().format("HH:mm:ss")}</div>
      default:
        return null;
    }
  } 

  return (
    <>
      <Modal
        width={500} 
        footer={false}
        closable={false}
        visible={isOpenModal}
        onOk={onOkeModal}
        onCancel={onCancelModal}
        bodyStyle={{padding: 0}}
      >
        <MachineModalWrapper>
          <div className='backgroundMachine' style={{height: 300}}>
            <div className='infoMachine'>
              <div className='nameMachine'>{name}</div>
              <Status className='status' style={widgetStyle} />
            </div>
          </div>
          <TopicsWidget
                 key={topic._id}
                  topicId={topic._id}
                  topicName={topic.name}
                  topicLink={topic.linkName}
                  topicDatatype={topic.dataType}
                  lastUpdate={topic.updatedAt}
                >
                  <TopicDetailWidget
                    key={topic._id}
                    dataType={topic.dataType}
                    message={topic.message}
                    template={topic.template}
                    deviceId={topic.device}
                    topicId={topic._id}
                    subPubStatus={topic.isPub}
                  />
              </TopicsWidget>
        </MachineModalWrapper>
      </Modal>
      <MachineWidgetWrapper onClick={onClickMachine} className="isoMachineWidget" style={widgetStyle}>
            <MachineStatus className='status' style={widgetStyle}>
              <div className='nameMachine'>
                  <strong style={{fontSize: 16}}>{name}</strong>
                  {showRenderType()}
              </div>
              <div className='codeMachine'>
                <div>{code}</div>
                {showTime()}
              </div>
            </MachineStatus>
            {showRenderTopic()}
      </MachineWidgetWrapper>
    </>
  );
}
