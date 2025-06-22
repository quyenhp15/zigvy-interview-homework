import axios from "./axios-instance";

export type SignUpInput = {
  email: string;
  password: string;
};

type SignUpOutput = {
  email: string;
  accessToken: string;
};

export const signUp = async (data: SignUpInput): Promise<SignUpOutput> => {
  const result = await axios.post("/auth/sign-up", data);
  const output = result.data.data as SignUpOutput;
  return output;
};
