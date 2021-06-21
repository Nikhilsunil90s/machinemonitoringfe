import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import { Line } from "react-chartjs-2";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import {Space, Button, DatePicker, Select, message, PageHeader, Row, Col} from "antd";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";

import {
  CalendarOutlined,
  TableOutlined,
  CloseOutlined,
  AreaChartOutlined,
  MailOutlined,
  FilePdfOutlined,
  PrinterOutlined
} from "@ant-design/icons";

import CardWrapper, { Box } from "./MessageTableChart.styles";
import { ChartWrapper, TopHeaderWrapper } from "../tableCharts/Charts.styles";

import { machaineParameters } from "../MachineParameters";
import { FetchMessages, messagesSelector } from "../../../redux/messages";

import Scrollbars from "../../../components/utility/customScrollBar";
import MessageColumn from "../../../components/utility/messageColumn";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";

import _ from "lodash";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function MessageChart() {
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
  let series = chart.series.push(new am4charts.LineSeries());
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
  series.tooltip.label.padding(12,12,12,12);
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
      if (messages[0].topic.dataType === 1) {
        machaineParameters.forEach((item, i) => {
          if (i === 0) fistItem = i + "";
          children.push(<Option key={i++}>{item.replace("_", " ")}</Option>);
        });
      } else {
        Object.getOwnPropertyNames(messages[0].payload).map((msg, i) => {
          fistItem = msg;
          children.push(<Option key={msg}>{msg}</Option>);
        });
      }
    }
    firstSelectedElement.current = fistItem;
    selSelectChildren(children);
  }, [messages]);

  useEffect(() => {
    let dataSet = new Map();
    const dateLabels = messages.map((msg) => {
      Object.getOwnPropertyNames(msg.payload).map((objPayload) => {
        // Array of parameters prod.[1,2,3..] [10,20,30...]
        if (Array.isArray(msg.payload[objPayload])) {
          const paremeters = msg.payload[objPayload].entries();
          for (const [index, element] of paremeters) {
            const sIndex = index.toString();
            if (!dataSet.get(sIndex)) {
              dataSet.set(sIndex, [element]);
            } else {
              const newElement = dataSet.get(sIndex);
              newElement.push(element);
              dataSet.set(sIndex, newElement);
            }
          }
        }
        // payload is obj {a10, b10}, {a11,b11} ....
        else {
          if (!dataSet.get(objPayload)) {
            dataSet.set(objPayload, [msg.payload[objPayload]]);
          } else {
            const newElement = dataSet.get(objPayload);
            newElement.push(msg.payload[objPayload]);
            dataSet.set(objPayload, newElement);
          }
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
        label: labelParam.replace("_", " "),
        data: dataSet.get(firstSelectedElement.current),
      });
    } else {
      selectedParameters.forEach((param) => {
        const labelParam = machaineParameters[param]
          ? machaineParameters[param]
          : param;
        series.push({label: labelParam.replace("_", " "),
          data: dataSet.get(param),
        });
      });
    }
    setData({ labels: dateLabels, datasets: series });
    buildDataTable([]);
  }, [messages]);

  useEffect(() => {
    buildDataTable(selectedParameters);
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
        label: labelParam.replace("_", " "),
        data: chartData.data.get(param),
      });
    });
    setSelectedParameters(value);

    setData({ labels: chartData.labels, datasets: dataSets });
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
  function buildDataTable(selectedValues) {
    const dataTable = [];

    const msgData = messages.map((msg) => {
      Object.getOwnPropertyNames(msg.payload).map((objPayload) => {
        if (Array.isArray(msg.payload[objPayload])) {
          const paremeters = msg.payload[objPayload].entries();

          let messageContent = {};
          for (const [index, element] of paremeters) {
            const firstItem = machaineParameters[firstSelectedElement.current]
              ? machaineParameters[firstSelectedElement.current]
              : firstSelectedElement.current;

            const selectedValueIndex = selectedValues.indexOf(index.toString());
            if (selectedValueIndex >= 0) {
              messageContent = {
                ...messageContent,
                [machaineParameters[
                  selectedValues[selectedValueIndex]
                ]]: element,
              };
            }
            if (
              selectedValues.length === 0 &&
              machaineParameters[index.toString()] === firstItem
            ) {
              messageContent = {
                ...messageContent,
                [machaineParameters[index]]: element,
              };
            }
          }
          dataTable.push({ ...messageContent, updatedAt: msg.updatedAt });
        }
      });
      // payload is obj {a10, b10}, {a11,b11} ....
      if (msg.topic.dataType !== 1) {
        dataTable.push({ ...msg.payload, updatedAt: msg.updatedAt });
      }
    });

    let columns = [
      {
        title: "#",
        width: "10%",
        dataIndex: "count",
        sorter: (a, b) => a.count - b.count,
      },
      {
        title: "UpdatedAt",
        dataIndex: "updatedAt",
        sorter: (a, b) => a.count - b.count,
      },
    ];
    if (messages && messages.length > 0) {
      Object.getOwnPropertyNames(dataTable[0]).map((col, index = 0) => {
        const selectedValueIndex = machaineParameters.indexOf(col);
        const selectedValueIndexObj = selectedValues.indexOf(col);

        const firstItem =
          selectedValues.length === 0 ? firstSelectedElement.current : null;

        if (
          selectedValueIndex >= 0 ||
          selectedValueIndexObj >= 0 ||
          col === firstItem
        ) {
          columns.push({
            title: col.replace("_", " "),
            dataIndex: col,
            sorter: (a, b) => a.count - b.count,
          });
        }
        index++;
      });
      setTableContent(dataTable);

      setTableColumns(columns);
      if (screenid !== "0") {
        setTableDetailVisible(true);
      }
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

  let prodValue, parameter = [];
  if (messages && messages.length > 0) {
    if (messages[0].topic.dataType === 1) {
      prodValue = Object.getOwnPropertyNames(messages[0].payload);
    } else {
      Object.getOwnPropertyNames(messages[0].payload).map((msg, i) => {
        parameter.push(msg);
      });
    }
  }

  return (
    <LayoutWrapper>
      <Box>
        <h1 className="isoPageHeader">
          <IntlMessages id="widget.topicChart.page.title" />
        </h1>
      </Box>
      <Box>
        <TopHeaderWrapper style={{flexDirection: 'row'}}>
          <Select
            size="large"
            mode="tags"
            placeholder="Select parameters"
            style={{ minWidth: 200 }}
            onChange={onParamettersChange}
          >
            {selectChildren}
          </Select>

          {selectedParameters.length > 0 ? (
            <>
              <Button size="large" onClick={() => on30MFilter()}>
                30M
              </Button>
              <Button size="large" onClick={() => on1HFilter()}>
                1H
              </Button>
              <Button size="large" onClick={() => on8HFilter()}>
                8H
              </Button>
              <Button size="large" onClick={() => on24HFilter()}>
                24h
              </Button>

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

      {messages && messages.length > 0 && messages[0].topic.dataType === 1 && data && data.labels && data.datasets[0] ? (
          <Box>
            <Row justify="space-around" align="middle">
              <MessageColumn type={"short"} title={"OEE"} params={`${messages[0].payload[prodValue][17] / 1000}%`} value={2.7} color={"isColor"}/>
              <MessageColumn type={"short"} title={"Availability"} params={"42:02:50"} value={19.6}/>
              <MessageColumn type={"short"} title={"Performance"} params={"34:19:18"} value={31.1}/>
              <MessageColumn type={"short"} title={"Quality"} params={"18:25:39"} value={30.6}/>
            </Row>
            <Row justify="space-around" align="middle" style={{marginTop: "20px"}}>
              <Col flex={5} className="column">
                <MessageColumn type={"detail"} title={"OEE Scores"} color={"isColor"}/>
                <MessageColumn type={"detail"} title={"Availability"} params={`${messages[0].payload[prodValue][14] / 100}%`}/>
                <MessageColumn type={"detail"} title={"Performance"} params={`${messages[0].payload[prodValue][15] / 100}%`}/>
                <MessageColumn type={"detail"} title={"Quality"} params={`${messages[0].payload[prodValue][16] / 100}%`}/>
                <MessageColumn type={"detail"} title={"OEE"} params={`${messages[0].payload[prodValue][17] / 100}%`}/>
              </Col>
              <Col flex={5} className="column">
                <MessageColumn type={"detail"} title={"OEE Loss %"} color={"isColor"} />
                <MessageColumn type={"detail"} title={"Availability"} params={"14.5%"}/>
                <MessageColumn type={"detail"} title={"Performance"} params={"11.5%"}/>
                <MessageColumn type={"detail"} title={"Quality"} params={"6.4%"}/>
                <MessageColumn type={"detail"} title={"OEE"} params={"32.2%"}/>
              </Col>
              <Col flex={5} className="column">
                <MessageColumn type={"detail"} title={"OEE Loss of time"} color={"isColor"}/>
                <MessageColumn title={"Availability"} params={"42:02:50"}/>
                <MessageColumn title={"Performance"} params={"34:19:18"}/>
                <MessageColumn title={"Quality"} params={"18:25:39"}/>
                <MessageColumn title={"OEE"} params={"94:47:49"}/>
              </Col>
            </Row>
          </Box>
      ) : null}

      {messages && messages.length > 0 && messages[0].topic.dataType === 3 ? (
          <Box>
            <Row justify="space-around" align="middle">
              <MessageColumn type={"short"} title={parameter[0]} params={"67.3%"} value={2.7} color={"isColor"}/>
              <MessageColumn type={"short"} title={parameter[1]} params={"42:02:50"} value={19.6}/>
              <MessageColumn type={"short"} title={parameter[2]} params={"34:19:18"} value={31.1}/>
              <MessageColumn type={"short"} title={parameter[3]} params={"18:25:39"} value={30.6}/>
            </Row>
          </Box>
      ) : null}

      {screenid === "0" ? (
        <Box>
          <h1>
            <IntlMessages id="widget.topicChart.chart.title" />
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
              <IntlMessages id="widget.topicChart.table.details" />
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
