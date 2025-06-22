import axiosInstance from "../axios-instance";

type GetTasksOutput = {
  accessToken: string;
};

export const getTasks = async (): Promise<GetTasksOutput> => {
  const result = await axiosInstance.get("/tasks");
  const output = result.data.data as GetTasksOutput;
  return output;
};
