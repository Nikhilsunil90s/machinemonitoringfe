import axios from "axios";
import siteConfig from "./site.config";

const token = localStorage.getItem("token");
console.log("apiUrl", siteConfig.apiUrl);
export const instance = axios.create({
  baseURL: siteConfig.apiUrl,
  timeout: 15000,
  headers: {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  },
});

export function setAuthorizationToken(token) {
  if (token) {
    // console.log("set token" + token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
