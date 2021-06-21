import React from "react";
import { SpeedChartsWidgetWrapper } from "./SpeedChartsWidget.styles";
import ReactSpeedometer from 'react-d3-speedometer';
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


export default function({
    title
}){
    return(
        <SpeedChartsWidgetWrapper>
            <div className="graphBlock">
            <div className="row">
                            <div className="col-6 text-center">
                         <p className="mt-1 ml-1"><b>{title}</b></p>
                            </div>
                            <div className="col-6 text-right">
                                <Link role="menuitem">
                                    <MoreOutlined />
                                </Link>
            </div>
            </div>
            <div style={{ 'margin-top': '55px' }}>
            <ReactSpeedometer width={450} maxValue={100} value={100} textColor={"#AAA"} segments={10} needleColor="steelblue"/>            </div>
            </div>
        </SpeedChartsWidgetWrapper>
    )
}