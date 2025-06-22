import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["GetTasks"],
    queryFn: getTasks,
  });
};
