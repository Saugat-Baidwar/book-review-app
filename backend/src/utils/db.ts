import mongoose from "mongoose";
import { env } from "./config";

const uri = env.MONGO_URI;

export async function createDBConnection() {
  const db = await mongoose.connect(uri);
  return db;
}