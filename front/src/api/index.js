import axios from "axios";

const apiUrl = 'http://localhost:5000'

const getDoctors = () => axios.get(apiUrl + "/doctor");
const getHospitals = () => axios.get(apiUrl + "/hospital");
const getAmbulMedics = () => axios.get(apiUrl + "/ambul-medic")
const getDiagnosis = () => axios.get(apiUrl + "/diagnosis")

export const getTargets = () =>
  axios
    .all([getDoctors(), getHospitals(), getAmbulMedics(), getDiagnosis()])
    .then(
      axios.spread((res1, res2, res3, res4) => [[...res1.data], [...res2.data], [...res3.data], [...res4.data]])
    );
