import mongoose from "mongoose";

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGO;

  if (!MONGODB_URI) {
    throw new Error("MONGO environment variable not defined");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  return mongoose;
}

export default connectToDatabase;
