import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://lighthouse-server-three.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
