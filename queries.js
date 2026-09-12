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

async function query5() {
    const author = await User.findOne({"name": "Ethan"})
    const subrredit =  await Subreddit.findOne({"name": "devops"})

    const thread = await Thread.create({
      title: "Docker or kurbenetes",
      content: "Which one is better?",
      author: author._id,
      subreddit: subrredit._id,
      createdAt: new Date()
    })
    console.log(thread)
}

async function query6() {
    const thread = await Thread.findOne({ title: "Docker or kurbenetes" });
    thread.title = "Facebook or Snapchat";
    await thread.save();
    console.log(thread);
}

async function query7() {
    const subreddits = await Subreddit.find({});
    for(const sub of subreddits) {
      const deletedThreads = await Thread.deleteMany({
        subreddit: sub._id
      })
      console.log(deletedThreads.deletedCount);
    }
    
    await Subreddit.deleteMany({});
    console.log('deleted all subreddits and their associated threads');
}

// Find the author ID and thread count for the user who posted the most threads
async function query8() {
    const threads = await Thread.aggregate([
        { $group: { _id: "$author", threadCount: { $sum: 1 } } },
        { $sort: { threadCount: -1 } },
        { $limit: 1 }
    ]);
    
    const topAuthorId = threads[0]._id;
    const topThreadCount = threads[0].threadCount;
    console.log(`Author ID: ${topAuthorId}, Thread Count: ${topThreadCount}`);
}

async function runQueries() {
    // Uncomment the query you want to run
    // await query1();
    // await query2();
    // await query3();
    // await query4();
    // await query5();
    // await query6();
    // await query7();
    await query8();
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