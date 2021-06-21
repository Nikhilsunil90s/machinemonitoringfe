import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";

import { Row, Col, message } from "antd";
import LayoutWrapper from "../../components/utility/layoutWrapper";
import basicStyle from "../../assets/styles/constants";
import ResultsChartsWidget from "./ResultsCharts/ResultsChartsWidget";
import SpeedChartsWidget from "./SpeedCharts/SpeedChartsWidget";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Label, LabelList, ResponsiveContainer, Tooltip } from "recharts";
import IsoWidgetsWrapper from "./WidgetsWrapper";
import TopicDetailWidget from "./TopicDetail/TopicDetail";
import TopicsWidget from "./Topic/TopicWidget";
import MachineWidget from "./Machine/MachineWidget";
import IntlMessages from "../../components/utility/intlMessages";

import {
  FetchMachines,
  FetchActiveMachines,
  IOMachineConnect,
  machinesSelector,
} from "../../redux/machines";

import { socket } from "../../config/socket.config";
import { FunnelIcon, RefreshIcon } from "../../assets/Icons";
import { WidgetWrapper } from "./Widgets.styles";


const data = [
  {
    name: "Prod Machine 1",
    "Output": 2000,
    "Reject": 0,
    "Target": 2400,
    "quantity": 5000
  },
  {
    name: "Prod Machine 2",
    "Output": 1000,
    "Reject": 0,
    "Target": 2210,
    "quantity": 10000

  },
  {
    name: "Prod Machine 3",
    "Output": 3000,
    "Reject": 0,
    "Target": 2290,
    "quantity": 15000

  },

];

const styles = {
  wisgetPageStyle: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
};

export default function () {
  const { rowStyle, colStyle } = basicStyle;
  const dispatch = useDispatch();
  const [machineStatus, setMachineStatus] = useState(0);
  const { machines, loading, hasError, ioError } = useSelector(
    machinesSelector
  );

  const pathMatch = useRouteMatch();
  const { screenId } = pathMatch.params;
  if (hasError)
    message.error(
      "Last transaction fail please your connections then try again"
    );
  if (ioError)
    message.error(" Sokect fail please your connections then try again");

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("profile"));
  //   if (!screenId) {
  //     dispatch(FetchActiveMachines(user.customerId, 1));
  //   } else {
  //     dispatch(FetchActiveMachines(user.customerId, 0));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      dispatch(IOMachineConnect(payload));
    });
  }, []); //only re-run the effect if new message comes in

  socket.on("connect_error", function (err) {
    message.error("connection error failed, Please reconfirm!!!");
  });

  const getMachineStatus = (machine) => {
    let status = 0;
    const prodTopic = machine.topics.filter(
      (topic) => topic.dataType === 1 && topic.message
    )[0];
    if (prodTopic) {
      if (prodTopic.message) {
        Object.getOwnPropertyNames(prodTopic.message.payload).map(
          (objPayload) => {
            if (Array.isArray(prodTopic.message.payload[objPayload])) {
              status = prodTopic.message.payload[objPayload][9];
            }
          }
        );
      }
    }
    return status;
  };

  console.log(machines);

  return (
    <LayoutWrapper>
        <WidgetWrapper>
        <div className="row">
            <div className="col-md-6">
                <span className="heading">
                  Production Dashboard
                </span>
                <span className="ml-3 font-25" >
                  <button className="btn bg-custom-light">
                    {RefreshIcon}
                  </button>
                </span>

                <span className="ml-2 font-25" >
                  <button className="btn bg-custom-light">
                  {FunnelIcon}
                  </button>
                </span>
            </div>
            <div className="col-md-6 text-right">
            <ul class="nav nav-tabs nav-pills" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="production-tab" data-toggle="tab" href="#production" role="tab" aria-controls="production" aria-selected="true">Production</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="custom-tab" data-toggle="tab" href="#custom" role="tab" aria-controls="custom" aria-selected="false">Custom</a>
                </li>
                
                <li class="nav-item">
                  <a class="nav-link" id="meter-tab" data-toggle="tab" href="#meter" role="tab" aria-controls="meter" aria-selected="false">Meter</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="recipie-tab" data-toggle="tab" href="#recipie" role="tab" aria-controls="recipie" aria-selected="false">Recipe</a>
                </li>
              </ul>
            </div>
            <div className="col-12">
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="production" role="tabpanel" aria-labelledby="production-tab">
                <div className="row">
                  <div className="col-4 mb-3">
                  <ResultsChartsWidget title={"Cummulative Output vs Target"} graphData={data}></ResultsChartsWidget>                
                  </div>
                  <div className="col-4 mb-3">
                  <ResultsChartsWidget title={"Cummulative Output vs Target"} graphData={data}></ResultsChartsWidget>                
                  </div>
                  <div className="col-4 mb-3">
                  <ResultsChartsWidget title={"Overall Efficiency %"} graphData={data}></ResultsChartsWidget>                
                  </div>
                  <div className="col-4 mb-3">
                  <ResultsChartsWidget title={"Top 5 Reject Categories(All Machines)"} graphData={data}></ResultsChartsWidget>                
                  </div>
                  <div className="col-4 mb-3">
                  <ResultsChartsWidget title={"Top 5 Downtime Categories"} graphData={data}></ResultsChartsWidget>                
                  </div>
                  <div className="col-4 mb-3">
                    <SpeedChartsWidget title={"Overall Efficiency % Average"}></SpeedChartsWidget>
                  </div>
                </div>
              </div>
              
              <div class="tab-pane fade" id="custom" role="tabpanel" aria-labelledby="custom-tab">...</div>
              <div class="tab-pane fade" id="meter" role="tabpanel" aria-labelledby="meter-tab">...</div>
              <div class="tab-pane fade" id="recipie" role="tabpanel" aria-labelledby="recipie-tab">...</div>

            </div>  
            </div>
          </div>
        </WidgetWrapper>
          

        
      {/* <Row style={rowStyle} gutter={0} justify="start"> */}
        {/* {machines.map((machine, idx) => {
           return machine.topics && machine.topics.length > 0 ? machine.topics.map(topic => (
                <Col
                  xxl={4}
                  xl={6}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={24}
                  style={colStyle}
                  key={idx}
                >
              <IsoWidgetsWrapper>
                <MachineWidget
                  machine={machine}
                  name={machine.name}
                  code={machine.code}
                  topic={topic}
                  icon={machine.imageLink}
                  status={getMachineStatus(machine)}
                  lastUpdate={machine.updatedAt}
                />
                
              </IsoWidgetsWrapper>
            </Col>
            )) : (
              <Col
                xxl={4}
                xl={6}
                lg={12}
                md={12}
                sm={12}
                xs={24}
                style={colStyle}
                key={idx}
              >
                <IsoWidgetsWrapper>
                  <MachineWidget
                    machine={machine}
                    name={machine.name}
                    topic={machine.topics}
                    code={machine.code}
                    icon={machine.imageLink}
                    status={getMachineStatus(machine)}
                    lastUpdate={machine.updatedAt}
                  />

                  
                </IsoWidgetsWrapper>
              </Col>
            )
        })} */}
      {/* </Row> */}
    </LayoutWrapper>
  );
}
