import React from "react";
import TopicDetailRawDataWidget from "./TopicDetailRawDataWidget";
import TopicDetailProdDataWidget from "./TopicDetailProdDataWidget";
import TopicDetailCustDataWidget from "./TopicDetailCustDataWidget";
import TopicDetailErrorDataWidget from "./TopicDetailErrorDataWidget";

export default function TopicDetailWidget({
  dataType,
  message,
  template,
  deviceId,
  topicId,
  subPubStatus,
}) {
  switch (dataType) {
    case 1:
      return <TopicDetailProdDataWidget message={message} />;
    case 3:
      return (
        <TopicDetailCustDataWidget
          message={message}
          template={template}
          deviceId={deviceId}
          topicId={topicId}
          subPubStatus={subPubStatus}
        />
      );
    case 5:
      return (
        <TopicDetailErrorDataWidget
          message={message}
          template={template}
          deviceId={deviceId}
          topicId={topicId}
          subPubStatus={subPubStatus}
        />
      );

    default:
      return <TopicDetailRawDataWidget message={message} />;
  }
}
