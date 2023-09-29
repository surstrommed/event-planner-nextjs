"use server";

import { COLLECTIONS } from "@consts/api";
import { getFormattedComment } from "@lib/utils/api";
import { IComment } from "@models/comments";
import {
  MongoClient,
  Db,
  Collection,
  WithId,
  OptionalId,
  Document,
} from "mongodb";
import clientPromise from ".";
import { INVALID_EMAIL_MESSAGE, NOT_EXIST_USER } from "@consts/messages";
import { isUserExisted } from "./auth";

let client: MongoClient;
let db: Db;
let comments: Collection<Document>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(process.env.MONGODB_DATABASE);
    comments = db.collection(COLLECTIONS.comments);
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
}

(async () => {
  await init();
})();

export async function createComment(comment: Omit<IComment, "id">) {
  try {
    if (!comments) await init();

    if (!comment.email) {
      throw new Error(INVALID_EMAIL_MESSAGE);
    }

    const { existedUser, error } = await isUserExisted(comment.email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const result = await comments
      .insertOne(comment as OptionalId<Document>)
      .then((createdComment) => ({
        id: createdComment.insertedId,
        ...comment,
      }));

    return { comment: result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getCommentsByEventId(eventId: string) {
  try {
    if (!comments) await init();
    const result = await comments
      .find({ eventId })
      .map((comment: WithId<Document>) =>
        getFormattedComment(comment as WithId<IComment>)
      )
      .toArray();

    return { comments: result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
