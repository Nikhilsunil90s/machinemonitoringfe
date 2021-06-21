import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import { Bar } from "react-chartjs-2";

import {Button, DatePicker, Select, message, PageHeader, Row, Col} from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";

import {
  CalendarOutlined,
  CloseOutlined,
  FilePdfOutlined,
  MailOutlined,
  PrinterOutlined,
  TableOutlined
} from "@ant-design/icons";

import CardWrapper, { Box } from "./MessageTableChart.styles";
import { ChartWrapper, TopHeaderWrapper } from "../tableCharts/Charts.styles";

import { machaineParameters } from "../MachineParameters";
import { FetchMessages, messagesSelector } from "../../../redux/messages";

import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";
import MessageColumn from "../../../components/utility/messageColumn";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ChartErrors() {
  const dispatch = useDispatch();
  const [selectedRowsArray, setSelectedRowsArray] = useState([]);

  const [rangePickerVisible, setRangePickerVisible] = useState(false);
  const [tableDetailVisible, setTableDetailVisible] = useState(false);

  const [selectedParameters, setSelectedParameters] = useState([]);
  const [selectChildren, selSelectChildren] = useState([]);
  const firstSelectedElement = useRef();
  const [chartData, setChartData] = useState();
  const [tableContent, setTableContent] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { screenid } = useParams();

  const { messages, loading, hasError } = useSelector(messagesSelector);
  const showRagnePicker = () => setRangePickerVisible(!rangePickerVisible);

  let chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.data = generateChartData();

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  let series = chart.series.push(new am4charts.ColumnSeries());
  const randomColor =
      "rgb(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      ")";
  series.stroke = am4core.color(randomColor);
  series.dataFields.valueY = "visits";
  series.dataFields.dateX = "date";
  series.strokeWidth = 3;
  series.minBulletDistance = 10;
  series.tooltipText = "{valueY}";
  series.tooltip.pointerOrientation = "vertical";
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.fillOpacity = 0.5;
  series.tooltip.label.padding(12,12,12,12)

  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.parent = chart.bottomAxesContainer;
  chart.scrollbarX.series.push(series);

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.cursor.snapToSeries = series;
  chart.exporting.menu = new am4core.ExportMenu();

  function generateChartData() {
    let chartData = [];
    if (messages && messages.length > 0 && data && data.labels && data.datasets[0]) {
      for (var i = 0; i < data.labels.length; i ++) {
        chartData.push({
          date: data.labels[i],
          visits: data.datasets[0].data[i]
        });
      }
    }
    return chartData;
  }

  useEffect(() => {
    dispatch(FetchMessages({ topic: id }));
  }, [dispatch, id]);

  useEffect(() => {
    const children = [];
    let fistItem = "";
    if (messages && messages.length > 0) {
      Object.getOwnPropertyNames(messages[0].payload).map((msg) => {
        fistItem = msg;
        children.push(<Option key={msg}>{msg}</Option>);
      });
    }
    firstSelectedElement.current = fistItem;
    selSelectChildren(children);
  }, [messages]);

  useEffect(() => {
    let dataSet = new Map();
    const dateLabels = messages.map((msg) => {
      Object.getOwnPropertyNames(msg.payload).map((objPayload) => {
        // payload is obj {a10, b10}, {a11,b11} ....
        const numberOfAlarm = [...msg.payload[objPayload].toString(2)].filter(
          (x) => x === "1"
        ).length;
        if (!dataSet.get(objPayload)) {
          dataSet.set(objPayload, [numberOfAlarm]);
        } else {
          const newElement = dataSet.get(objPayload);
          newElement.push(numberOfAlarm);
          dataSet.set(objPayload, newElement);
        }
      });
      return moment.utc(msg.createdAt).local().format("DD MMM HH:mm");
    });
    setChartData({ labels: dateLabels, data: dataSet });

    let series = [];
    if (selectedParameters.length === 0) {
      const labelParam = machaineParameters[firstSelectedElement.current]
        ? machaineParameters[firstSelectedElement.current]
        : firstSelectedElement.current;
      series.push({
        ...chartOptions(),
        label: labelParam.replace("_", " "),
        data: dataSet.get(firstSelectedElement.current),
      });
    } else {
      selectedParameters.forEach((param) => {
        const labelParam = machaineParameters[param]
          ? machaineParameters[param]
          : param;
        series.push({
          ...chartOptions(),
          label: labelParam.replace("_", " "),
          data: dataSet.get(param),
        });
      });
    }
    setData({ labels: dateLabels, datasets: series });
    buildDataTable([]);
  }, [messages]);

  useEffect(() => {
    buildDataTable();
  }, [selectedParameters]);

  if (hasError) {
    message.error("Last transaction failed, Please reconfirm!!!");
  }

  const onParamettersChange = (value) => {
    let dataSets = [];
    value.forEach((param) => {
      const labelParam = machaineParameters[param]
        ? machaineParameters[param]
        : param;
      dataSets.push({
        ...chartOptions(),
        label: labelParam.replace("_", " "),
        data: chartData.data.get(param),
      });
    });
    setSelectedParameters(value);
    console.log({ labels: chartData.labels, datasets: dataSets });
    setData({ labels: chartData.labels, datasets: dataSets });
  };

  const chartOptions = () => {
    const randomColor =
      "rgb(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      ")";

    return {
      fill: false,
      lineTension: 0.1,
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: randomColor,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: randomColor,
      pointHoverBorderColor: randomColor,
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 5,
    };
  };

  const on30MFilter = () => {
    getDataMessages(30);
  };

  const on1HFilter = () => {
    getDataMessages(60);
  };
  const on8HFilter = () => {
    getDataMessages(480);
  };
  const on24HFilter = () => {
    getDataMessages(1440);
  };

  function onCustomHFilter(value) {
    if (value) {
      const startDate = moment.parseZone(value[0]).utc().format();

      const endDate = moment.parseZone(value[1]).utc().format();
      dispatch(
        FetchMessages({ topic: id, startDate: startDate, endDate: endDate })
      );
    }
  }
  function buildDataTable() {
    const dataTable = [];
    const msgData = messages.slice(-1).map((msg) => {
      // payload is obj {a10, b10}, {a11,b11} ....
      if (msg.topic.dataType === 5) {
        // Errors
        const binErrors = [...msg.payload.errors.toString(2)].reverse();
        if (binErrors) {
          binErrors.map((err, idx) => {
            if (parseInt(err) === 1 && msg.topic.template[0].length > idx) {
              const error = msg.topic.template[0].filter(
                (temp) => parseInt(temp.id) === idx
              )[0];
              const errorStr = {
                type: "Error",
                color: "red",
                message: `Id:${msg.payload.errors},${error.id} Message:${error.message}`,
              };
              dataTable.push({ ...errorStr, updatedAt: msg.updatedAt });
            }
            idx++;
          });
        }

        // Alarms
        const binAlarms = [...msg.payload.alarms.toString(2)].reverse();
        if (binAlarms) {
          binAlarms.map((err, idx) => {
            if (parseInt(err) === 1 && msg.topic.template[1].length > idx) {
              const alarm = msg.topic.template[1].filter(
                (temp) => parseInt(temp.id) === idx
              )[0];
              const alarmStr = {
                type: "Alarm",
                color: "#f58442",
                message: `Id:${msg.payload.alarms},${alarm.id} Message:${alarm.message}`,
              };
              dataTable.push({ ...alarmStr, updatedAt: msg.updatedAt });
            }
            idx++;
          });
        }

        // Warnings
        const binWarnings = [...msg.payload.warnings.toString(2)].reverse();
        if (binWarnings) {
          binWarnings.map((err, idx) => {
            if (parseInt(err) === 1 && msg.topic.template[2].length > idx) {
              const warning = msg.topic.template[2].filter(
                (temp) => parseInt(temp.id) === idx
              )[0];
              const warningStr = {
                type: "Warning",
                color: "#4e42f5",
                message: `Id:${msg.payload.warnings},${warning.id} Message:${warning.message}`,
              };
              dataTable.push({ ...warningStr, updatedAt: msg.updatedAt });
            }
            idx++;
          });
        }

        // infos
        const binInfos = [...msg.payload.infos.toString(2)].reverse();
        if (binInfos) {
          binInfos.map((err, idx) => {
            if (parseInt(err) === 1 && msg.topic.template[3].length > idx) {
              const info = msg.topic.template[3].filter(
                (temp) => parseInt(temp.id) === idx
              )[0];
              const infoStr = {
                type: "Info",
                color: "black",
                message: `Id:${msg.payload.infos},${info.id} Message:${info.message}`,
              };
              dataTable.push({ ...infoStr, updatedAt: msg.updatedAt });
            }
            idx++;
          });
        }
      }
    });

    let columns = [
      {
        title: "#",
        width: "10%",
        dataIndex: "count",
        sorter: (a, b) => a.count - b.count,
        render(text, record) {
          return {
            props: {
              style: {
                color: record.color,
                opacity: 0.8,
                fontWeight: 500,
              },
            },
            children: <>{text}</>,
          };
        },
      },
      {
        title: "UpdatedAt",
        dataIndex: "updatedAt",
        sorter: (a, b) => a.count - b.count,
        render(text, record) {
          return {
            props: {
              style: {
                color: record.color,
                opacity: 0.8,
                fontWeight: 500,
              },
            },
            children: <>{text}</>,
          };
        },
      },
      {
        title: "Type",
        dataIndex: "type",
        sorter: (a, b) => a.count - b.count,
        render(text, record) {
          return {
            props: {
              style: {
                color: record.color,
                opacity: 0.8,
                fontWeight: 500,
              },
            },
            children: <>{text}</>,
          };
        },
      },

      {
        title: "Messages",
        dataIndex: "message",
        sorter: (a, b) => a.count - b.count,
        render(text, record) {
          return {
            props: {
              style: {
                color: record.color,
                opacity: 0.8,
                fontWeight: 500,
              },
            },
            children: <>{text}</>,
          };
        },
      },
    ];

    setTableContent(dataTable);

    setTableColumns(columns);
    if (screenid !== "0") {
      setTableDetailVisible(true);
    }
  }
  const onShowTable = () => {
    setTableDetailVisible(!tableDetailVisible);
  };

  function getDataMessages(filterMin) {
    const startDate = moment
      .parseZone(moment().subtract(filterMin, "minutes"))
      .utc()
      .format();
    const endDate = moment.parseZone(moment()).utc().format();
    dispatch(
      FetchMessages({ topic: id, startDate: startDate, endDate: endDate })
    );
  }

  // Table row selection
  const rowSelection = {
    selectedRowsArray,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowsArray([...selectedRows]);
    },
    getCheckboxProps: (record) => {
      return { msgId: record.msgId };
    },
  };

  // let prodValue;
  // if (messages && messages.length > 0) {
  //   prodValue = Object.getOwnPropertyNames(messages[49].payload);
  // }

  return (
    <LayoutWrapper>
      <Box>
        <h1 className="isoPageHeader">
          <IntlMessages id="widget.chartErrors.page.title" />
        </h1>
      </Box>
      <Box>
        <TopHeaderWrapper>
          {screenid === "0" ? (
            <Select
              size="large"
              mode="tags"
              placeholder="Select parameters"
              style={{ minWidth: 200 }}
              onChange={onParamettersChange}
            >
              {selectChildren}
            </Select>
          ) : null}

          {selectedParameters.length > 0 || screenid === "1" ? (
            <>
              <Button size="large" onClick={() => on30MFilter()}>30M</Button>
              <Button size="large" onClick={() => on1HFilter()}>1H</Button>
              <Button size="large" onClick={() => on8HFilter()}>8H</Button>
              <Button size="large" onClick={() => on24HFilter()}>24H</Button>
              <Button size="large" onClick={() => showRagnePicker()}>
                <CalendarOutlined />
              </Button>

              {rangePickerVisible ? (
                <RangePicker
                  size="large"
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  defaultValue={[moment().subtract(30, "minutes"), moment()]}
                  onOk={onCustomHFilter}
                />
              ) : null}
            </>
          ) : null}

          {screenid !== "0" ? null : (
            <Button size="large" onClick={() => onShowTable()}>
              <TableOutlined />
            </Button>
          )}

          {/*{screenid !== "0" ? null : (*/}
          {/*    <Button style={{marginLeft: 'auto'}} size="large">*/}
          {/*      <FilePdfOutlined />*/}
          {/*    </Button>*/}
          {/*)}*/}

          {/*{screenid !== "0" ? null : (*/}
          {/*    <Button size="large">*/}
          {/*      <PrinterOutlined />*/}
          {/*    </Button>*/}
          {/*)}*/}

          {/*{screenid !== "0" ? null : (*/}
          {/*    <Button style={{marginRight: '35px'}} size="large">*/}
          {/*      <MailOutlined />*/}
          {/*    </Button>*/}
          {/*)}*/}

          {screenid !== "0" ? null : (
              <Link style={{marginLeft: 'auto'}} to={`/dashboard/`}>
                <Button size="large">
                  <CloseOutlined />
                </Button>
              </Link>
          )}
        </TopHeaderWrapper>
      </Box>

      <Box>
        <Row justify="space-around" align="middle">
          <MessageColumn type={"short"} title={"Errors"} params={"18:25:39"} value={30.6}/>
          <MessageColumn type={"short"} title={"Alarms"} params={"42:02:50"} value={19.6}/>
          <MessageColumn type={"short"} title={"Warnings"} params={"34:19:18"} value={31.1}/>
          <MessageColumn type={"short"} title={"Infos"} params={"18:25:39"} value={30.6}/>
        </Row>
        <Row justify="space-around" align="middle" style={{marginTop: "20px"}}>
          <Col flex={5} className="column">
            <MessageColumn type={"detail"} title={"Scores"} color={"isColor"}/>
            <MessageColumn type={"detail"} title={"Errors"} params={"85.5%"}/>
            <MessageColumn type={"detail"} title={"Alarms"} params={"65.2%"}/>
            <MessageColumn type={"detail"} title={"Warnings"} params={"91.4%"}/>
            <MessageColumn type={"detail"} title={"Informations"} params={"67.3%"}/>
          </Col>
          <Col flex={5} className="column">
            <MessageColumn type={"detail"} title={"Numbers"} color={"isColor"}/>
            <MessageColumn type={"detail"} title={"Errors"} params={"110"}/>
            <MessageColumn type={"detail"} title={"Alarms"} params={"59"}/>
            <MessageColumn type={"detail"} title={"Warnings"} params={"78"}/>
            <MessageColumn type={"detail"} title={"Informations"} params={"89"}/>
          </Col>
          <Col flex={5} className="column">
            <MessageColumn type={"detail"} title={"Loss of time"} color={"isColor"}/>
            <MessageColumn title={"Errors"} params={"42:02:50"}/>
            <MessageColumn title={"Alarms"} params={"34:19:18"}/>
            <MessageColumn title={"Warnings"} params={"18:25:39"}/>
            <MessageColumn title={"Infos"} params={"94:47:49"}/>
          </Col>
        </Row>
      </Box>

      {screenid === "0" ? (
        <Box>
          <h1>
            <IntlMessages id="widget.chartErrors.chart.title" />
          </h1>
          <ChartWrapper className="isoChartWrapper">
            <div id="chartdiv" style={{width: "100%", height: "600px"}}/>
          </ChartWrapper>
        </Box>
      ) : null}
      {tableDetailVisible ? (
        <Box>
          <CardWrapper>
            <h1>
              <IntlMessages id="widget.chartErrors.table.title" />
            </h1>
            <div>
              <Scrollbars
                style={{ width: "100%", height: "calc(100vh - 70px)" }}
              >
                <TableWrapper
                  bordered
                  dataSource={tableContent.map((item, i) => ({
                    ...item,
                    key: i,
                    count: ++i,
                    updatedAt: moment
                      .utc(item.updatedAt)
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss"),
                  }))}
                  // rowSelection={rowSelection}
                  columns={tableColumns || []}
                  pagination={false}
                  className="SettingListTable"
                />
              </Scrollbars>
            </div>
          </CardWrapper>
        </Box>
      ) : null}
    </LayoutWrapper>
  );
}
