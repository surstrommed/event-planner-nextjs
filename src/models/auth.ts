import { AppDispatch } from "@lib/utils/store";
import { z } from "zod";

export type SignInHandler = (
  email: string,
  password: string,
  dispatch: AppDispatch
) => Promise<void>;

const AuthForm = z.object({
  toggleAuthType: z.function().args().returns(z.void()),
});

export type IAuthForm = z.infer<typeof AuthForm> & {
  signInHandler: SignInHandler;
};
