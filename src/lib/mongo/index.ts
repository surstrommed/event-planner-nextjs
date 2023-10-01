import { MongoClient } from "mongodb";

const URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.vcfnaqf.mongodb.net/?retryWrites=true&w=majority`;
const options = {};

if (!URI) throw new Error("Please check your MongoDB connection!");

const client = new MongoClient(URI, options);
let clientPromise: Promise<MongoClient>;
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.ENVIRONMENT !== "production") {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
