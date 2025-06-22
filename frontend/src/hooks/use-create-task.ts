import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createTask } from "../axios";
import { Task } from "../models";

export type CreateTaskParams = {
  onError: (e: any) => void;
  onSuccess: (createdTask: Task) => void;
};

export const useCreateTask = ({ onError, onSuccess }: CreateTaskParams) => {
  return useMutation({
    mutationFn: createTask,
    onError: (e) => {
      const error = e as AxiosError<{ message: string }>;
      onError(error?.response?.data);
    },
    onSuccess(_data, variables) {
      onSuccess(variables);
    },
  });
};
