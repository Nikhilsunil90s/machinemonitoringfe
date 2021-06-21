import React from "react";
import moment from "moment";
import IntlMessages from "../../../components/utility/intlMessages";
import Progress from "../../../components/uielements/progress";
import { ProdWidgetWrapper } from "./TopicDetailWidget.styles";
import { Row, Col } from "antd";

const isObject = (obj) => obj && obj.constructor && obj.constructor === Object;
const machineStatus = (status) => {
  switch (status) {
    case 1:
      return <IntlMessages id="widget.topictetailprod.stop" />;
    case 2:
      return <IntlMessages id="widget.topictetailprod.running" />;
    case 3:
      return <IntlMessages id="widget.topictetailprod.alarm" />;
    case 4:
      return <IntlMessages id="widget.topictetailprod.plannedstop" />;
    case 9:
      return <IntlMessages id="widget.topictetailprod.nocomm" />;
    default:
      return <IntlMessages id="widget.topictetailprod.nostatus" />;
  }
};

export default function TopicDetailProdDataWidget({ message }) {
  if (message && isObject(message.payload)) {
    const prodValue = Object.getOwnPropertyNames(message.payload);
    if (
      Array.isArray(message.payload[prodValue]) &&
      message.payload[prodValue].length === 25
    ) {
      return (
        <ProdWidgetWrapper style={{ status: message.payload[prodValue][9] }}>
          <Row justify="space-around" align="middle">
            <Col flex={2} className="isorRunTimeLabel">
              <p>
                <IntlMessages id="widget.topictetailprod.runTime" />:
              </p>
              <h1>
                {moment
                  .utc(message.payload[prodValue][11] * 1000)
                  .format("HH:mm:ss")}
              </h1>
            </Col>
            <Col flex={2} className="isoProdRatioCircleProgress">
              <p>
                <IntlMessages id="widget.topictetailprod.goal" />
              </p>
              <Progress
                style={{ margin: "10px" }}
                type="circle"
                percent={message.payload[prodValue][18] / 100}
                format={(percent) => `${percent}%`}
              />
            </Col>
            <Col flex={2} className="isorStopTimeLabel">
              <p>
                <IntlMessages id="widget.topictetailprod.stoptime" />
              </p>
              <h1>
                {moment
                  .utc(message.payload[prodValue][2] * 1000)
                  .format("HH:mm:ss")}
              </h1>
            </Col>
          </Row>

          <Row className="isoProdOEEProgress">
            <Col span={24}>
              <h3>
                <IntlMessages id="widget.topictetailprod.availibilty" />{" "}
              </h3>
              <Progress
                type="line"
                percent={message.payload[prodValue][14] / 100}
                format={(percent) => `${percent} %`}
                // status="active"
              />
            </Col>
          </Row>
          <Row className="isoProdOEEProgress">
            <Col span={24}>
              <h3>
                {" "}
                <IntlMessages id="widget.topictetailprod.performance" />
              </h3>
              <Progress
                type="line"
                percent={message.payload[prodValue][15] / 100}
                format={(percent) => `${percent} %`}
                // status="active"
              />
            </Col>
          </Row>
          <Row className="isoProdOEEProgress">
            <Col span={24}>
              <h3>
                <IntlMessages id="widget.topictetailprod.quality" />
              </h3>
              <Progress
                type="line"
                percent={message.payload[prodValue][16] / 100}
                format={(percent) => `${percent} %`}
                // status="active"
              />
            </Col>
          </Row>
          <Row className="isoProdOEEProgress">
            <Col span={24}>
              <h3>
                <IntlMessages id="widget.topictetailprod.qee" />
              </h3>
              <Progress
                type="line"
                strokeColor={{
                  "0%": "#ff0000",
                  "100%": "#87d068",
                }}
                percent={message.payload[prodValue][17] / 100}
                format={(percent) => `${percent} %`}
                // status="active"
              />
            </Col>
          </Row>
          <hr />
          <Row style={{alignItems: 'center'}}> 
            <Col span={8} className="isoProdCountLabel">
              <IntlMessages id="widget.topictetailprod.count" />
              <h1> {message.payload[prodValue][0]}</h1>
            </Col>
            <Col span={8} className="isoMachineStatusLabel">
              <h1> {machineStatus(message.payload[prodValue][9])}</h1>
            </Col>
            <Col span={8} className="isoScrapCountLabel">
              <IntlMessages id="widget.topictetailprod.scrap" />
              <h1> {message.payload[prodValue][1]}</h1>
            </Col>
          </Row>
        </ProdWidgetWrapper>
      );
    } else return null;
  } else {
    return null;
  }
}
