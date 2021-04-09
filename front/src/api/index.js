import axios from "axios";

const getDoctors = () => axios.get("/doctor");
const getHospitals = () => axios.get("/hospital");

export const getTargets = () =>
  axios
    .all([getDoctors(), getHospitals()])
    .then(axios.spread((res1, res2) => [[...res1.data], [...res2.data]]));
