import React, {useEffect, useRef, useState} from 'react';
import {Col, Row} from "antd";
import Trend from "./trend";
import './index.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {ChartWrapper} from "../../containers/TopicMessage/tableCharts/Charts.styles";

export default function ({
  type,
  title,
  params,
  value,
  color,
}) {

    return (
        {...type === "short" ? (
                <Col flex={3} className="column">
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <div className="detail">
                        <div className="detailValue">
                            {color ? (
                                <h1 style={{color: "#FFC000"}}>
                                    {params}
                                </h1>
                            ) : (
                                <h1>
                                    {params}
                                </h1>
                            )}
                        </div>
                        <div className="detailImage">
                        </div>
                    </div>
                    <div>
                        <Trend value={value}/>
                    </div>
                </Col>
            ) : (
                <Row justify="space-between">
                    <Col className="title">
                        {color ? (
                            <h1>{title}</h1>
                        ) : (
                            <h1 style={{color: "black"}}>{title}</h1>
                        )}
                    </Col>
                    {params ? (
                        <Col className="value">
                            {!type ? (
                                <h1 style={{color: "#92D050"}}>
                                    {params}
                                </h1>
                            ) : ({...title === "Quality" || title === "Warnings" ? (
                                    <h1 style={{color: "red"}}>
                                        {params}
                                    </h1>
                                ) : (
                                    <h1>
                                        {params}
                                    </h1>
                                )}
                            )}
                        </Col>
                    ) : null}
                </Row>
            )
        }
    );
}