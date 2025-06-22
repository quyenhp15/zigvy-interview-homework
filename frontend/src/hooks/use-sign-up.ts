import { useMutation } from "@tanstack/react-query";
import { signUp } from "../axios";
import { AxiosError } from "axios";
import { ACCESS_TOKEN_KEY } from "../utils";

export type SignUpParams = {
  onError: (e: any) => void;
};

export const useSignUp = (params: SignUpParams) => {
  return useMutation({
    mutationFn: signUp,
    onError: (e) => {
      const error = e as AxiosError<{ message: string }>;
      params.onError(error?.response?.data);
    },
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    },
  });
};
