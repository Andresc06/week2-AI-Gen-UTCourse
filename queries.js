import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from "./models/User.js"
import Subreddit from './models/Subreddit.js';
import Thread from './models/Thread.js';


async function query1() {
    const user = await User.findOne({email: "diana@example.com"});
    console.log(user);
}

async function query2() {
    const subreddits = await Subreddit.findOne({name: "programming"});
    const threads = await Thread.find({subreddit: subreddits._id});
    console.log(threads);
}

async function query3() {
    const UsersId = await Thread.distinct("author");
    const users = await User.find({_id: {$in: UsersId}});
    console.log(users);
}

async function query4() {
    const threads = await Thread.find({ 'createdAt': { $gte: new Date('2024-01-01') } });
    console.log(threads);
}

async function runQueries() {
    // Uncomment the query you want to run
    // await query1();
    // await query2();
    // await query3();
    await query4();
}

async function main() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    await runQueries();
  } catch (err) {
    console.error("DB connection failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
  }
}

main();