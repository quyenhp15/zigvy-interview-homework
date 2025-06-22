import { Task } from "../../models";
import axiosInstance from "../axios-instance";

export const createTask = async (input: Task): Promise<void> => {
  await axiosInstance.post("/tasks", input);
};
