import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBooks = (search = "", sort = "", category = "") => {
  const axiosPublic = useAxiosPublic();

  const {
    data: books = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["books", search, sort, category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/books?search=${search}&sort=${sort}&category=${category}`
      );
      return res.data;
    },
  });

  return [books, loading, refetch];
};

export default useBooks;
