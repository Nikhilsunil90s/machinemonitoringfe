import React from "react";
import {
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

const privateOptions = {
  key: "Setting",
  label: "sidebar.setting",
  leftIcon: <SettingOutlined />,
  children: [
    {
      key: "customers",
      label: "sidebar.setting.customer",
    },

    {
      key: "machines",
      label: "sidebar.setting.machine",
    },
    {
      key: "topics",
      label: "sidebar.setting.topic",
    },
    {
      key: "messages",
      label: "sidebar.setting.message",
    },
    {
      key: "brokers",
      label: "sidebar.setting.broker",
    },
  ],
};

const options = [
  {
    key: "dashmachines/0",
    label: "Dashboard",
    leftIcon: <UnorderedListOutlined />,
  },
  {
    key: "dashmachines/0",
    label: 'Machines',
    leftIcon: <UnorderedListOutlined />,
  },
  privateOptions,
];

// const user = JSON.parse(localStorage.getItem("profile"));
// if (user.devIdMatch) options.push(privateOptions);
const user = {
  'name': 'Test User',
  'username': 'UserTest',
  'email': 'usertest@email.com',
  'customer': 'PushIdeas',
  'role': 'Admin',
  'language': 'english',
}

export default options;
