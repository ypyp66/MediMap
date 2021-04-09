import axios from "axios";

export const getDoctors = () => {
  axios.get("/doctor");
};
