import { useMutation } from "@tanstack/react-query";
import { signIn } from "../axios";
import { AxiosError } from "axios";
import { ACCESS_TOKEN_KEY } from "../utils";

export type SignInParams = {
  onError: (e: any) => void;
};

export const useSignIn = (params: SignInParams) => {
  return useMutation({
    mutationFn: signIn,
    onError: (e) => {
      const error = e as AxiosError<{ message: string }>;
      params.onError(error?.response?.data);
    },
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    },
  });
};
