import React from "react";
import { Descriptions, Statistic } from "antd";
const isObject = (obj) => obj && obj.constructor && obj.constructor === Object;

export const Message = ({ message }) => {
  if (isObject(message)) {
    return (
      <Descriptions bordered column={1} size="small" key={message._id}>
        {Object.getOwnPropertyNames(message).map((msg, i) => (
          <Descriptions.Item label={msg} key={++i}>
            <strong> {message[msg] + ""} </strong>
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  } else {
    return <p> {message} </p>;
  }
};
