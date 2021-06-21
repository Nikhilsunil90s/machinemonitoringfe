// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";

// import DashboardPage from "./pages/Dashboard/DashboardPage";
// import PostsPage from "./pages/PostsPage";
// import { Navbar } from "./components/Navbar";
// import SinglePostPage from "./pages/SinglePostPage";

// const App = () => {
//   return (
//     <Router>
//       {/* <Navbar /> */}
//       <Switch>
//         <Route exact path="/" component={DashboardPage} />
//         <Route exact path="/posts" component={PostsPage} />
//         <Route exact path="/posts/:id" component={SinglePostPage} />
//         <Redirect to="/" />
//       </Switch>
//     </Router>
//   );
// };
// export default App;

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import GlobalStyles from "./assets/styles/globalStyle";
import AppProvider from "./AppProvider";

import Routes from "./router";
import rootReducer from "./redux";

import "./index.css";

const store = configureStore({ reducer: rootReducer });

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </AppProvider>
  </Provider>
);

export default App;

// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Layout, Menu } from "antd";
// import Icon from "@ant-design/icons";
// import {
//   DashboardOutlined,
//   UserOutlined,
//   CloseOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// // Public Pages
// import HomePage from "./pages/public/HomePage";
// import ProductPage from "./pages/public/ProductPage";
// import SolutionPage from "./pages/public/SolutionPage";
// import CompanyPage from "./pages/public/CompanyPage";
// import ContactPage from "./pages/public/ContactPage";
// import LoginPage from "./pages/public/LoginPage";
// // Prtected Page
// import DashboardPage from "./pages/protected/DashBoardPage";
// import usersPage from "./pages/protected/UsersPage";
// import AddEditUser from "./pages/protected/AddEditUser";
// import BrokersPage from "./pages/protected/BrokersPage";
// import AddEditBroker from "./pages/protected/AddEditBroker";
// import CustomersPage from "./pages/protected/CustomersPage";
// import AddEditCustomer from "./pages/protected/AddEditCustomer";
// import MachinesPage from "./pages/protected/MachinesPage";
// import AddEditMachine from "./pages/protected/AddEditMachine";
// import ConnectTopicMachine from "./pages/protected/ConnectTopicMachine";
// import MessagesPage from "./pages/protected/MessagesPage";
// import AddEditMessage from "./pages/protected/AddEditMessage";
// import TopicsPage from "./pages/protected/TopicsPage";
// import TopicDetailPage from "./pages/protected/TopicDetailPage";

// import AddEditTopic from "./pages/protected/AddEditTopic";
// import { socket } from "./socket";
// //Services
// import { Auth } from "./service/Auth";
// import Routes from "./router";

// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

// const centerStyle = {
//   position: "relative",
//   display: "flex",
//   justifyContent: "center",
// };
// const rightStyle = {
//   position: "absolute",
//   top: 0,
//   right: 0,
// };

// class App extends Component {
//   state = {
//     collapsed: false,
//     authenticated: false,
//   };

//   onCollapse = (collapsed) => {
//     this.setState({ collapsed });
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   authenticate = () => {
//     const auth = Auth.authenticated() ? true : false;
//     this.setState({
//       authenticated: auth,
//     });
//   };

//   render() {
//     return (
//       <Router>
//         <Layout style={{ minHeight: "100vh" }}>
//           {Auth.authenticated() ? (
//             <Sider
//               breakpoint="lg"
//               collapsedWidth="0"
//               collapsible
//               onCollapse={(collapsed, type) => {
//                 console.log(collapsed, type);
//               }}
//             >
//               <div className="logo">{" MBK"}</div>
//               <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
//                 <Menu.Item key="1">
//                   <DashboardOutlined />
//                   <span>Deshboard</span>
//                   <Link to="/dashboard" />
//                 </Menu.Item>

//                 <Menu.Item key="4" onClick={Auth.logout.bind(this)}>
//                   <CloseOutlined />
//                   <span>Log Out</span>
//                 </Menu.Item>

//                 <SubMenu
//                   key="sub1"
//                   title={
//                     <span>
//                       <SettingOutlined />
//                       <span>Setting</span>
//                     </span>
//                   }
//                 >
//                   <Menu.Item key="51">
//                     <span>Customers</span>
//                     <Link to="/customers" />
//                   </Menu.Item>
//                   <Menu.Item key="52">
//                     <span>Users</span>
//                     <Link to="/users" />
//                   </Menu.Item>
//                   <Menu.Item key="53">
//                     <span>Machines</span>
//                     <Link to="/machines" />
//                   </Menu.Item>
//                   <Menu.Item key="54">
//                     <span>Brokers</span>
//                     <Link to="/brokers" />
//                   </Menu.Item>
//                   <Menu.Item key="55">
//                     <span>Topics</span>
//                     <Link to="/topics" />
//                   </Menu.Item>
//                   <Menu.Item key="56">
//                     <span>Messages</span>
//                     <Link to="/messages" />
//                   </Menu.Item>
//                 </SubMenu>
//               </Menu>
//             </Sider>
//           ) : null}

//           <Layout>
//             <Header
//               style={{
//                 position: "fixed",
//                 zIndex: 1,
//                 width: "100%",
//                 backgroundColor: "#fff",
//               }}
//             >
//               {!Auth.authenticated() ? (
//                 <Menu style={centerStyle} mode="horizontal">
//                   <Menu.Item key="1">
//                     Home <Link to="/" />{" "}
//                   </Menu.Item>
//                   <Menu.Item key="2">
//                     Product <Link to="/product" />{" "}
//                   </Menu.Item>
//                   <Menu.Item key="3">
//                     Solutions <Link to="/solution" />{" "}
//                   </Menu.Item>
//                   <Menu.Item key="4">
//                     Company <Link to="/company" />{" "}
//                   </Menu.Item>
//                   <Menu.Item key="5">
//                     Contact <Link to="/contact" />
//                   </Menu.Item>
//                   <Menu.Item key="6">
//                     Login
//                     <Link to="/login" />
//                   </Menu.Item>
//                 </Menu>
//               ) : (
//                 <div>
//                   <h1> Header</h1>
//                 </div>
//               )}
//               <Icon
//                 className="trigger"
//                 type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
//                 style={{ cursor: "pointer" }}
//                 onClick={this.toggle}
//               />
//             </Header>
//             <Content
//               style={{
//                 margin: "24px 16px",
//                 padding: 24,
//                 background: "#fff",
//                 overflow: "auto",
//                 height: "100vh",
//                 left: 0,
//                 minHeight: 380,
//               }}
//             >
//               <Route exact path="/" component={HomePage} />
//               <Route exact path="/product" component={ProductPage} />
//               <Route exact path="/solution" component={SolutionPage} />
//               <Route exact path="/company" component={CompanyPage} />
//               <Route exact path="/contact" component={ContactPage} />
//               <Route exact path="/login" component={LoginPage} />

//               <Route exact path="/dashboard" component={DashboardPage} />
//               {/* <Route exact path="/posts/:id" component={SinglePostPage} /> */}

//               <Route exact path="/users" component={usersPage} />
//               <Route
//                 exact
//                 path={["/users/new", "/users/:id"]}
//                 component={AddEditUser}
//               />

//               <Route exact path="/customers" component={CustomersPage} />
//               <Route
//                 exact
//                 path={["/customers/new", "/customers/:id"]}
//                 component={AddEditCustomer}
//               />

//               <Route exact path="/machines" component={MachinesPage} />
//               <Route
//                 exact
//                 path={["/machines/new", "/machines/:id"]}
//                 component={AddEditMachine}
//               />
//               <Route
//                 exact
//                 path="/connecttopicmachine/:id"
//                 component={ConnectTopicMachine}
//               />

//               <Route exact path="/messages" component={MessagesPage} />
//               <Route
//                 exact
//                 path={["/messages/new", "/messages/:id"]}
//                 component={AddEditMessage}
//               />
//               <Route exact path="/brokers" component={BrokersPage} />
//               <Route
//                 exact
//                 path={["/brokers/new", "/brokers/:id"]}
//                 component={AddEditBroker}
//               />
//               <Route exact path="/topics" component={TopicsPage} />
//               <Route
//                 exact
//                 path={["/topics/new", "/topics/:id"]}
//                 component={AddEditTopic}
//               />
//               <Route
//                 exact
//                 path="/topicdetail/:id"
//                 component={TopicDetailPage}
//               />
//             </Content>
//             <Footer style={{ textAlign: "center" }}>MBK CONTROLS ©2020</Footer>
//           </Layout>
//         </Layout>
//       </Router>
//     );
//   }
// }

// export default App;
