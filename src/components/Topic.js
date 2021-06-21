import React from "react";

import { Descriptions, Card, Statistic, Avatar } from "antd";
const isObject = (obj) => obj && obj.constructor && obj.constructor === Object;

const { Meta } = Card;

const Topic = ({ topic, excerpt }) => {
  //   console.log("topic:", topic);
  return (
    <Card
      type="inner"
      bodyStyle={{ textAlign: "center", padding: 0 }}
      title={<p> {topic.name}</p>}
    >
      {isObject(topic.message.payload) ? (
        <Descriptions bordered column={1} size="small">
          {topic.message
            ? Object.getOwnPropertyNames(topic.message.payload).map((msg) => (
                <Descriptions.Item label={msg}>
                  <Statistic
                    value={topic.message.payload[msg]}
                    precision={2}
                    //valueStyle={{ color: "#3f8600" }}
                    // prefix={<ArrowUpOutlined />}
                    // prefix={<ArrowDownOutlined />}
                    // suffix="%"
                  />
                </Descriptions.Item>
              ))
            : null}
        </Descriptions>
      ) : (
        <p> {topic.message.payload} </p>
      )}
    </Card>
  );
};

export default Topic;
