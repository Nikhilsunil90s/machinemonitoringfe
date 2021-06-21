import { combineReducers } from "redux";
import App from "./app/reducer";

// import postsReducer from "./posts";
// import postReducer from "./post";
// import commentsReducer from "./comments";

import usersReducer from "./users";
import brokersReducer from "./brokers";
import machinesReducer from "./machines";
import topicsReducer from "./topics";
import customersReducer from "./customers";
import messagesReducer from "./messages";
import LanguageSwitcher from "./languageSwitcher/reducer";
import ThemeSwitcher from "./themeSwitcher/reducer";

const rootReducer = combineReducers({
  App,
  // posts: postsReducer,
  // comments: commentsReducer,
  // post: postReducer,
  users: usersReducer,
  brokers: brokersReducer,
  machines: machinesReducer,
  topics: topicsReducer,
  customers: customersReducer,
  messages: messagesReducer,
  LanguageSwitcher,
  ThemeSwitcher,
});

export default rootReducer;
