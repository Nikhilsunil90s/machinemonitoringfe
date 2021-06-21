import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Label, LabelList, ResponsiveContainer, Tooltip } from "recharts";
import { ResultsChartsWidgetWrapper } from "./ResultsChartsWidget.styles";
import { MoreOutlined } from "@ant-design/icons";


export default function({
    title,
    graphData
}){
    return (
        <ResultsChartsWidgetWrapper>
            <div className="graphBlock">
                        <div className="row">
                            <div className="col-6 text-center">
                         <p className="mt-1 ml-1"><b>{title}</b></p>
                            </div>
                            <div className="col-6 text-right">
                            <MoreOutlined />
                            </div>
                        </div>
                         <ResponsiveContainer width="100%" height={300} className="mr-2">
                          <BarChart className="mt-5" width={300} height={200} data = {graphData}>
                            <XAxis dataKey="name"/>
                            <YAxis label={{ value: 'Quantity' , position: 'insideLeft' , textAnchor: 'middle' , angle: -90 }}/>
                            <Tooltip/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
                            <Legend/>
                            <Bar dataKey="Output" stackId="a" barSize={70} fill="lightgreen"/>
                            <Bar dataKey="Reject" stackId="a" barSize={70} fill="red"/>
                            <Bar dataKey="Target" stackId="a" barSize={70} fill="lightblue"/>
                          </BarChart>
                          </ResponsiveContainer>
                       </div>
        </ResultsChartsWidgetWrapper>
    )
}