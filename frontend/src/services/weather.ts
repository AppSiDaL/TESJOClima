import axios from "axios";
const url = "http://localhost:3000/api";
const getLanding = () => {
  return axios.get(`${url}/landing`).then((res) => res.data);
};

const getNow = () => {
  return axios.get(`${url}/now`).then((res) => res.data);
};

const getHours = () => {
  return axios.get(`${url}/hours`).then((res) => res.data);
};

export default { getLanding, getNow, getHours };
