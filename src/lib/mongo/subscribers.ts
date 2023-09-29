"use server";

import { Collection, Db, Document, MongoClient } from "mongodb";
import clientPromise from ".";
import { COLLECTIONS } from "@consts/api";

let client: MongoClient;
let db: Db;
let subscribers: Collection<Document>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(process.env.MONGODB_DATABASE);
    subscribers = db.collection(COLLECTIONS.subscribers);
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
}

(async () => {
  await init();
})();

export async function newsletterSubscribe(email: string) {
  try {
    if (!subscribers) await init();
    const result = await subscribers
      .insertOne({ email })
      .then((subscriber) => ({
        id: subscriber.insertedId,
        email,
      }));

    return { subscriber: result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
