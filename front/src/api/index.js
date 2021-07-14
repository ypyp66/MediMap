import axios from "axios";

const getDoctors = () => axios.get("/doctor");
const getHospitals = () => axios.get("/hospital");
const getAmbulMedics = () => axios.get("/ambul-medic");
const getDiagnosis = () => axios.get("/diagnosis");

export const getAllSubDatas = () => axios.get("/detail");

export const getTargets = () =>
  axios
    .all([getDoctors(), getDiagnosis(), getHospitals(), getAmbulMedics()])
    .then(
      axios.spread((res1, res2, res3, res4) => [
        [...res1.data],
        [...res2.data],
        [...res3.data],
        [...res4.data],
      ])
    );
