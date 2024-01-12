import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.n9i9gx6.mongodb.net/`;

  let client;

  try {
    client = await mongoose.connect(MONGODB_URI);
    console.log("DB IS CONNECTED");
  } catch (error) {
    console.log("DB IS NOT CONNECTED " + error);
  }
};
