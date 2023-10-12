import axios from "axios";

const getLanding = () => {
  return axios.get("http://localhost:3000/landing").then((res) => res.data);
};

const getNow = () => {
  return axios.get("http://localhost:3000/now").then((res) => res.data);
};

const getHours = () => {
  return axios.get("http://localhost:3000/hours").then((res) => res.data);
};

export default { getLanding, getNow, getHours };
