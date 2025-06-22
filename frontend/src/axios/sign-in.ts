import axios from "./axios-instance";

type SignInInput = {
  email: string;
  password: string;
};

type SignInOutput = {
  accessToken: string;
};

export const signIn = async (data: SignInInput) => {
  const result = await axios.post("/auth/sign-in", data);
  const output = result.data.data as SignInOutput;
  return output;
};
