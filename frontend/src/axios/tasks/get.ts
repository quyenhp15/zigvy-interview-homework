import { Task } from "../../models";
import axiosInstance from "../axios-instance";

export const getTasks = async (): Promise<Task[]> => {
  const result = await axiosInstance.get("/tasks");
  const output = result.data.data as Task[];
  return output;
};
