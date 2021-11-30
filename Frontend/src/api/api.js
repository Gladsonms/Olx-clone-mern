import axios from "axios";
const url = "https://localhost://5000/";
export const signUp = () => axios.post(`${url},signup`);
