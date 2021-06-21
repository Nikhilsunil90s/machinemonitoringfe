import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import moment from "moment";
import { Button } from "antd";
import { TableOutlined, AreaChartOutlined } from "@ant-design/icons";

import { TopicWidgetWrapper } from "./TopicWidget.styles";
import notification from "../../Notification";

export default function ({
  topicId,
  topicName,
  topicLink,
  topicDatatype,
  lastUpdate,
  status,
  children,
}) {
  const widgetStyle = {
    status: status,
  };
  const pathMatch = useRouteMatch();

  const testNotification = () => {
    notification("error", `Massage Moved Successfully`, "");
  };

  return (
    <TopicWidgetWrapper className="isoTopicsWidget" style={widgetStyle}>
      <div className="isoTopicsWidgetBar">{children}</div>
      {/* <Button className="isoChartBtn">
          <AreaChartOutlined />
          ${pathMatch.path}/connecttopicmachine/${record._id}
        </Button>
        <Button className="isoTableBtn">
          <EllipsisOutlined />
        </Button> */}
      {/* <Link to={`${pathMatch.path}message/chart/${0}/${topicId}`}> */}

      {topicDatatype === 5 ? (
        <div className="isoTopicWidgetFooter" size="middle">
          <Link to={`/dashboard/history/chart/${0}/${topicId}`}>
            <AreaChartOutlined />
          </Link>
          <Link
            to={`/dashboard/history/table/${1}/${topicId}`}
            className="pullright"
          >
            <TableOutlined />
          </Link>
        </div>
      ) : (
        <div className="isoTopicWidgetFooter" size="middle">
          <Link to={`/dashboard/message/chart/${0}/${topicId}`}>
            <AreaChartOutlined />
          </Link>
          <p className="isoDescription">
            {topicLink} :
            {moment.utc(lastUpdate).local().format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <Link
            to={`/dashboard/message/table/${1}/${topicId}`}
            className="pullright"
          >
            <TableOutlined />
          </Link>
        </div>
      )}
      {/* <Button onClick={() => testNotification()}> Chick </Button> */}

    </TopicWidgetWrapper>
  );
}
