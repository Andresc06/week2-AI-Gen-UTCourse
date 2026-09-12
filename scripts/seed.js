import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import User from "../models/User.js";
import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

async function connectToDatabase() {
  dotenv.config();
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the .env file");
  }
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected successfully to database");
}

async function clearExistingData() {
  console.log("Clearing existing data...");
  // Order doesn't matter for deletes, but keep it explicit and log per-collection results.
  const [users, subreddits, threads] = await Promise.all([
    User.deleteMany({}),
    Subreddit.deleteMany({}),
    Thread.deleteMany({}),
  ]);
  console.log(
    `Cleared ${users.deletedCount} users, ${subreddits.deletedCount} subreddits, ${threads.deletedCount} threads`
  );
}

function readJson(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function seedCollection(model, fileName, label) {
  const documents = readJson(fileName);
  const inserted = await model.insertMany(documents);
  console.log(`Inserted ${inserted.length} ${label}`);
  return inserted;
}

async function seedAllData() {
  // Insert order matters: users must exist before subreddits/threads reference them,
  // and subreddits must exist before threads reference them.
  console.log("Seeding data...");
  await seedCollection(User, "users.json", "users");
  await seedCollection(Subreddit, "subreddits.json", "subreddits");
  await seedCollection(Thread, "threads.json", "threads");
  console.log("All data seeded successfully!");
}

async function main() {
  try {
    await connectToDatabase();
    await clearExistingData();
    await seedAllData();
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed");
  }
}

main();
