import axios from "axios";

const SERVER_PORT_NUMBER = 8080;
const SERVER_URL = `http://${window.location.hostname}:${SERVER_PORT_NUMBER}/`;

const Axios = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

Axios.interceptors.request.use(
  (config) => config,
  (error) => {
    // 요청에 대한 오류 발생 시, 오류 내용을 출력하고 요청을 거절함
    console.log("🚀 ~ request error : ", error);
    alert("🚀 ~ response error ");
    Promise.reject(error);
  }
);

// 오류 처리를 위한 별도 errorController
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("🚀 ~ response error : ", error);
    alert("🚀 ~ response error ");
    Promise.reject(error);
  }
);

export default Axios;
