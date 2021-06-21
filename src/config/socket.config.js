import io from "socket.io-client";
import siteConfig from "./site.config";

export const socket = io(siteConfig.socketUrl, {
  secure: true,
  rejectUnauthorized: false,
  path: "/live/socket.io",
});
const user = JSON.parse(localStorage.getItem("profile"));
if (user) socket.emit(`JoinCompany`, user);
