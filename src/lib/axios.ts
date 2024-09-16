import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://apid.c4m.mg/ticket-place-app/public",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
