import React from "react";
import { Link } from "react-router-dom";
import { Descriptions, Card, Statistic, Avatar } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import Topic from "./Topic";

const headStatusStyle = (status) => {
  switch (status) {
    case 0:
      // Blue Communication Error
      return {
        backgroundColor: "#047ed1",
      };
    case 1:
      // Red Stopped ff5050
      return {
        backgroundColor: "#ff5050",
      };
    case 2:
      //Green Ruuning
      return {
        backgroundColor: "#1ebe42",
      };
    case 3:
      //Orange Alarm
      return {
        backgroundColor: "#ffa401",
      };
    case 4:
      //Planned Shutdown
      return {
        //b0b0b0
        backgroundColor: "#b0b0b0",
      };
    default:
      // Blue Communication Error
      return {
        backgroundColor: "#047ed1",
      };
  }
};

const { Meta } = Card;

export const Machine = ({ machine, excerpt }) => {
  return (
    <Card
      style={{ margin: 10 }}
      type="inner"
      bodyStyle={{ textAlign: "center", padding: 0 }}
      headStyle={headStatusStyle(Math.floor(Math.random() * Math.floor(5)))}
      actions={[
        <>
          {excerpt && (
            <Link to={`/posts/${machine._id}`} className="accent">
              <SettingOutlined key="setting" />
            </Link>
          )}
        </>,

        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
      title={
        <Meta
          avatar={
            <Avatar
              shape="square"
              size="large"
              src={machine.image}
              style={{ opacity: "0.7" }}
              icon={<BoxPlotOutlined />}
            />
          }
          title={
            <h1 style={{ color: " #ffffff", margin: 0 }}>{machine.name}</h1>
          }
          description={
            <p style={{ color: " #ffffff", margin: 0 }}>{machine.code}</p>
          }
        />
      }
    >
      {machine.topics.map((topic) => (
        <Topic topic={topic} />
      ))}
    </Card>
  );
};

// import React from "react";
// import { Link } from "react-router-dom";

// export const Post = ({ post, excerpt }) => (
//   <article className={excerpt ? "post-excerpt" : "post"}>
//     <h2> {post.title} </h2>
//     <p>{excerpt ? post.body.substring(0, 100) : post.body} </p>
//     {excerpt && (
//       <Link to={`/posts/${post.id}`} className="button">
//         view Post
//       </Link>
//     )}
//   </article>
// );

// /* <Descriptions bordered column={1} size="small">
//   {messages
//     ? Object.getOwnPropertyNames(messages.messages).map((msg) => (
//         <Descriptions.Item label={msg}>
//           <Statistic
//             value={messages.messages[msg]}
//             precision={2}
//             //valueStyle={{ color: "#3f8600" }}
//             // prefix={<ArrowUpOutlined />}
//             // prefix={<ArrowDownOutlined />}
//             // suffix="%"
//           />
//         </Descriptions.Item>
//       ))
//     : null}
// </Descriptions> */

// const machine = {
//   name: "Machine 1",
//   code: "MC00001",
//   image:
//     "https://roboticsandautomationnews.com/wp-content/uploads/2017/10/fanuc-m-410ic-110-palletising-robot.jpg",
//   topic: {
//     name: "Topic1",
//     link: "link topic1",
//     message: {
//       status: 2,
//       param1: 1.16565,
//       param2: 2.589984,
//       param8: 50,
//       param3: "true",
//     },
//   },
// };
