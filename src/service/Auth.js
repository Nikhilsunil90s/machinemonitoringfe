import axios from "axios";
import { instance, setAuthorizationToken } from "../config/api.config";

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      Auth.logout();
    }
  }
);

export const Auth = {
  authenticated() {
    // return !!localStorage.getItem("token");
    return true
  },
  async login({ username, password }) {
    localStorage.clear();
    // instance.interceptors.request.use((config) => {
    //   delete config.headers["Authorization"];
    //   return config;
    // });

    const response = await instance
      .post(`/authenticate`, { username, password })
      .then((res) => {
        try {
          console.log("auth login");
          console.log(res);
          const { token, user } = res.data;
          localStorage.setItem("profile", JSON.stringify(user));
          localStorage.setItem("token", token);
          setAuthorizationToken(token);
        } catch (error) {
          console.log(error);
        }
      });
  },
  logout() {
    try {
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      instance.interceptors.request.use((config) => {
        delete config.headers["Authorization"];
        return config;
      });
      window.location = "/";
    } catch (error) {}
  },
};
