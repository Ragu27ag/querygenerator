import axios from "axios";

const axiosres = axios.create({
  baseURL: "http://localhost:5000", //
  timeout: 3000000,
});

axios.interceptors.request.use(
  function (res) {
    return res;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosres;
