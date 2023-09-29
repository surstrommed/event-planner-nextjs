import { z } from "zod";

const UserRole = z.union([z.literal("USER"), z.literal("ADMIN")]);
export type IUserRole = z.infer<typeof UserRole>;

const SigninData = z.object({
  email: z.string(),
  password: z.string(),
});
export type ISigninData = z.infer<typeof SigninData>;

const SignupData = z.object({
  fullName: z.string(),
});
export type ISignupData = z.infer<typeof SignupData> & ISigninData;

const User = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  image: z.string(),
  role: UserRole,
  savedEvents: z.string().array(),
});
export type IUser = z.infer<typeof User>;

const StoredUser = z
  .object({
    email: z.string(),
    name: z.string(),
    image: z.string(),
  })
  .nullable();
export type IStoredUser = z.infer<typeof StoredUser>;
