import React from "react";
import { Descriptions } from "antd";
import { TopicDetailWidgetBar } from "./TopicDetailWidget.styles";

const isObject = (obj) => obj && obj.constructor && obj.constructor === Object;

export default function TopicDetailRawDataWidget({ message }) {
  if (!message) return null;
  if (isObject(message.payload)) {
    return (
      <TopicDetailWidgetBar className="isoSingleProgressBar">
        <Descriptions bordered column={1} size="small" key={message._id}>
          {Object.getOwnPropertyNames(message.payload).map((msg, i) => (
            <Descriptions.Item label={msg} key={++i}>
              <strong> {message.payload[msg] + ""} </strong>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </TopicDetailWidgetBar>
    );
  } else {
    return (
      <TopicDetailWidgetBar className="isoSingleProgressBar">
        <Descriptions bordered size="small" key={message._id}>
          <Descriptions.Item label={"Value"} key={1}>
            <strong> {message.payload + ""} </strong>
          </Descriptions.Item>
        </Descriptions>
      </TopicDetailWidgetBar>
    );
  }
}
