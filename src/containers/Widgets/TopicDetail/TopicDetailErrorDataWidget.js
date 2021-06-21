import React, { useEffect, useState } from "react";
import IntlMessages from "../../../components/utility/intlMessages";

import { ErrorWrapper } from "./TopicDetailWidget.styles";
import { List } from "antd";

export default function TopicDetailCustDataWidget({ message, template }) {
  const [errorData, setErrorData] = useState();
  const [alarmData, setAlarmData] = useState();
  const [warningData, setWarningData] = useState();
  const [infoData, setInfoData] = useState();

  useEffect(() => {
    try {
      // Errors
      if (message) {
        const binErrors = [...message.payload.errors.toString(2)].reverse();
        if (binErrors) {
          let errors = [];
          binErrors.map((err, idx) => {
            if (parseInt(err) === 1 && template[0].length > idx) {
              errors.push(
                template[0].filter((temp) => parseInt(temp.id) === idx)[0]
              );
            }
            idx++;
          });
          setErrorData(errors);
        }
      }
      // alarms
      if (message) {
        const binalarms = [...message.payload.alarms.toString(2)].reverse();
        if (binalarms) {
          let alarms = [];
          binalarms.map((err, idx) => {
            if (parseInt(err) === 1 && template[1].length > idx) {
              alarms.push(
                template[1].filter((temp) => parseInt(temp.id) === idx)[0]
              );
            }
            idx++;
          });
          setAlarmData(alarms);
        }
      }
      // warnings
      if (message) {
        const binwarnings = [...message.payload.warnings.toString(2)].reverse();
        if (binwarnings) {
          let warnings = [];
          binwarnings.map((err, idx) => {
            if (parseInt(err) === 1 && template[2].length > idx) {
              warnings.push(
                template[2].filter((temp) => parseInt(temp.id) === idx)[0]
              );
            }
            idx++;
          });
          setWarningData(warnings);
        }
      }
      // infos
      if (message) {
        const bininfos = [...message.payload.infos.toString(2)].reverse();
        if (bininfos) {
          let infos = [];
          bininfos.map((err, idx) => {
            if (parseInt(err) === 1 && template[3].length > idx) {
              infos.push(
                template[3].filter((temp) => parseInt(temp.id) === idx)[0]
              );
            }
            idx++;
          });
          setInfoData(infos);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [message]);

  return (
    <ErrorWrapper>
      <List
        size="small"
        header={
          <div>
            <strong>
              <IntlMessages id="widget.topicDetail.error.header" />
            </strong>
          </div>
        }
        bordered
        dataSource={errorData}
        renderItem={(item) => (
          <List.Item>{item.id + " " + item.message}</List.Item>
        )}
        className="isoErrorList"
      />
      <List
        size="small"
        header={
          <div>
            <strong>
              <IntlMessages id="widget.topicDetail.alarm.header" />
            </strong>
          </div>
        }
        bordered
        dataSource={alarmData}
        renderItem={(item) => (
          <List.Item>{item.id + " " + item.message}</List.Item>
        )}
        className="isoAlarmList"
      />
      <List
        size="small"
        header={
          <div>
            <strong>
              <IntlMessages id="widget.topicDetail.warning.header" />
            </strong>{" "}
          </div>
        }
        bordered
        dataSource={warningData}
        renderItem={(item) => (
          <List.Item>{item.id + " " + item.message}</List.Item>
        )}
        className="isoWarningList"
      />
      <List
        size="small"
        header={
          <div>
            <strong>
              <IntlMessages id="widget.topicDetail.info.header" />
            </strong>
          </div>
        }
        bordered
        dataSource={infoData}
        renderItem={(item) => (
          <List.Item>{item.id + " " + item.message}</List.Item>
        )}
      />
    </ErrorWrapper>
  );
}
