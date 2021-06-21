import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "../../components/utility/loader";

const routes = [
  {
    path: "",
    component: lazy(() => import("../Widgets/Widgets")),
    exact: true,
  },

  {
    path: `dashmachines/:screenId`,
    component: lazy(() => import("../Widgets/Widgets")),
  },
  {
    path: "customers/:id",
    component: lazy(() => import("../Setting/Customer/AddEditCustomer")),
  },
  {
    path: "my-profile",
    component: lazy(() => import("../Setting/User/AddEditUser")),
  },
  {
    path: "customers",
    component: lazy(() => import("../Setting/Customer/Customers")),
  },
  {
    path: "users/:id",
    component: lazy(() => import("../Setting/User/AddEditUser")),
  },

  {
    path: "users",
    component: lazy(() => import("../Setting/User/Users")),
  },
  {
    path: "machines/connecttopicmachine/:id",
    component: lazy(() => import("../Setting/Machine/ConnectTopicMachine")),
  },
  {
    path: "machines/:id",
    component: lazy(() => import("../Setting/Machine/AddEditMachine")),
  },
  {
    path: "machines",
    component: lazy(() => import("../Setting/Machine/Machines")),
  },

  {
    path: "topics/topicdetail/:id",
    component: lazy(() => import("../Setting/Topic/TopicDetailPage")),
  },

  {
    path: "topics/:id",
    component: lazy(() => import("../Setting/Topic/AddEditTopic")),
  },

  {
    path: "topics",
    component: lazy(() => import("../Setting/Topic/Topics")),
  },
  {
    path: "messages/:id",
    component: lazy(() => import("../Setting/Message/AddEditMessage")),
  },

  {
    path: "messages",
    component: lazy(() => import("../Setting/Message/Messages")),
  },

  {
    path: "brokers/:id",
    component: lazy(() => import("../Setting/Broker/AddEditBroker")),
  },

  {
    path: "brokers",
    component: lazy(() => import("../Setting/Broker/Brokers")),
  },
  {
    path: "message/chart/:screenid/:id",
    component: lazy(() =>
      import("../TopicMessage/tableCharts/MessageTableChart")
    ),
  },

  {
    path: "message/table/:screenid/:id/",
    component: lazy(() =>
      import("../TopicMessage/tableCharts/MessageTableChart")
    ),
  },
  {
    path: "history/chart/:screenid/:id/",
    component: lazy(() => import("../TopicMessage/tableCharts/ChartErrors")),
  },
  {
    path: "history/table/:screenid/:id/",
    component: lazy(() => import("../TopicMessage/tableCharts/ChartErrors")),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
