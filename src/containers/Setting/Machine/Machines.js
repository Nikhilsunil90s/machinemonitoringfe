import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import IntlMessages from "../../../components/utility/intlMessages";
import CardWrapper, { Box } from "../setting.styles";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/AntTables/AntTables.styles";

import {
  DeleteMachine,
  FetchMachines,
  machinesSelector,
} from "../../../redux/machines";

import { Button, Popconfirm, PageHeader, message, Tag } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  ApiOutlined,
} from "@ant-design/icons";

const MachinesPage = () => {
  const [deleteKey, setdeleteKey] = useState("");
  const dispatch = useDispatch();
  const pathMatch = useRouteMatch();

  const { machines, loading, hasError } = useSelector(machinesSelector);
  useEffect(() => {
    dispatch(FetchMachines());
  }, [dispatch]);

  if (hasError) {
    message.error("Last transaction failed, Please reconfirm!!!");
  }

  const isDeleting = (record) => record._id === deleteKey;

  const deleteRecord = (record) => {
    setdeleteKey(record._id);
  };

  const cancel = () => {
    setdeleteKey("");
  };

  const deleteMachine = async (machine) => {
    try {
      dispatch(DeleteMachine(machine));
      setdeleteKey("");
    } catch (errInfo) {
      console.log(errInfo);
    }
  };
  const columns = [
    {
      title: "#",
      dataIndex: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (record) => {
        return record ? <p> {record.companyName}</p> : null;
      },
      sorter: (a, b) =>
        a.customer.companyName.length - b.customer.companyName.length,
    },
    {
      title: "Status ",
      dataIndex: "isActive",
      render: (state) => {
        return state ? (
          <Tag color={"green"}>Active</Tag>
        ) : (
          <Tag color={"red"}>Disable</Tag>
        );
      },
      sorter: (a, b) => a.isActive - b.isActive,
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "",
      dataIndex: "operation",
      colSpan: 1,
      fixed: "right",
      render: (_, record) => {
        const deletable = isDeleting(record);
        return (
          <span style={{ display: "block" }}>
            <Link to={`${pathMatch.path}/${record._id}`}>
              <FormOutlined className="SettingViewBtn" />
            </Link>
            {deletable ? (
              <>
                <a
                  href="javascript:;"
                  onClick={() => deleteMachine(record._id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Confirm
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </>
            ) : (
              <Button
                className="SettingDltBtn"
                disabled={deleteKey !== ""}
                onClick={() => deleteRecord(record)}
              >
                <DeleteOutlined className="ion-android-delete" />
              </Button>
            )}
            <Link to={`${pathMatch.path}/connecttopicmachine/${record._id}`}>
              <ApiOutlined className="SettinConnectBtn" />
            </Link>
          </span>
        );
      },
    },
  ];

  console.log(machines)

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.machine.pageheader" />
      </PageHeader>

      <Box>
        <div className="isoSettingTableBtn">
          <Link to={`${pathMatch.path}/new`}>
            <Button type="primary" className="mateAddSettingBtn">
              <PlusCircleOutlined />
            </Button>
          </Link>
        </div>
        <CardWrapper title="Machines">
          <div>
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                dataSource={machines.map((item, i) => ({
                  ...item,
                  key: item._id,
                  count: ++i,
                }))}
                columns={columns}
                pagination={false}
                className="SettingListTable"
              />
            </Scrollbars>
          </div>
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
};

export default MachinesPage;
