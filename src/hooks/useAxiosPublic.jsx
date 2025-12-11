import axios from "axios";
const backendUrl = "https://lighthouse-server-three.vercel.app";

const axiosPublic = axios.create({
  baseURL: backendUrl,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
