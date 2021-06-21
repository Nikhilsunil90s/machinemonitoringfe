import React from "react";
import { DeploymentUnitOutlined } from "@ant-design/icons";

export default {
  siteName: "MBK Controls",
  siteIcon: <DeploymentUnitOutlined />,
  footerText: `MBK Controls @ ${new Date().getFullYear()} Created MBK, Inc`,
  enableAnimatedRoute: false,
  // Remote server:
  apiUrl: "https://machine.mbkcontrols.com/api/",
  socketUrl: "https://machine.mbkcontrols.com/",
  // Local Dev
  // apiUrl: "http://localhost:8000/api/",
  // socketUrl: "http://localhost:8000",
  dashboard: "/dashboard",
};
