"use server";

import { COLLECTIONS } from "@consts/api";
import {
  NOT_EXIST_USER,
  INVALID_USER_CREDENTIALS,
  SUCCESS_PASSWORD_UPDATE,
  INVALID_EMAIL_MESSAGE,
  SUCCESS_AVATAR_UPDATE,
} from "@consts/messages";
import { ISignupData, ISigninData, IUser } from "@models/user";
import { hash, compare } from "bcrypt";
import {
  MongoClient,
  Db,
  Collection,
  OptionalId,
  Document,
  ObjectId,
} from "mongodb";
import clientPromise from ".";

let client: MongoClient;
let db: Db;
let users: Collection<Document>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(process.env.MONGODB_DATABASE);
    users = db.collection(COLLECTIONS.users);
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
}

(async () => {
  await init();
})();

const hashPassword = async (password: string) =>
  await hash(password, Number(process.env.PASSWORD_HASH_SALT));

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => await compare(password, hashedPassword);

export async function isUserExisted(email: string | null) {
  try {
    if (!users) await init();

    if (!email) {
      throw new Error(INVALID_EMAIL_MESSAGE);
    }

    const user = await users.findOne<
      Omit<IUser, "id"> & { _id: ObjectId; password: string }
    >({ email });
    if (user) {
      return { existedUser: user };
    } else {
      return { existedUser: null };
    }
  } catch (error) {
    return {
      existedUser: null,
      error: (error as Error).message,
    };
  }
}

export async function signup(userData: ISignupData) {
  try {
    if (!users) await init();

    const hashedPassword = await hashPassword(userData.password);
    const user = {
      ...userData,
      password: hashedPassword,
      image: "",
      role: "USER",
    } as OptionalId<Document>;

    const result = await users.insertOne(user).then(() => {
      const { password, ...formattedUser } = user;
      return formattedUser;
    });

    return { user: result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function signin(userData: ISigninData) {
  if (!users) await init();

  const { existedUser } = await isUserExisted(userData.email);

  if (!existedUser) {
    throw new Error(NOT_EXIST_USER);
  }

  const isValid = await verifyPassword(userData.password, existedUser.password);

  if (!isValid) {
    throw new Error(INVALID_USER_CREDENTIALS);
  }

  const user = {
    id: String(existedUser._id),
    email: existedUser.email,
    name: existedUser.fullName,
    image: existedUser.image,
    role: existedUser.role,
  };

  return user;
}

export async function changePassword(email: string, newPassword: string) {
  try {
    if (!users) await init();

    const hashedNewPassword = await hashPassword(newPassword);
    await users.updateOne({ email }, { $set: { password: hashedNewPassword } });

    return { message: SUCCESS_PASSWORD_UPDATE };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function changeAvatar(email: string, avatarUrl: string) {
  try {
    if (!users) await init();

    await users.updateOne({ email }, { $set: { image: avatarUrl } });

    return { message: SUCCESS_AVATAR_UPDATE };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
