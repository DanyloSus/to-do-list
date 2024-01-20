//import from libraries
import mongoose from "mongoose";

//export function which connect database
export const connectMongoDB = async () => {
  //variable of database's url
  const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.n9i9gx6.mongodb.net/`;

  let client;

  //try and catch errors
  try {
    //connect
    client = await mongoose.connect(MONGODB_URI);
    console.log("DB IS CONNECTED");
  } catch (error) {
    //throw an error
    console.log("DB IS NOT CONNECTED " + error);
    throw new Error("DB IS NOT CONNECTED " + error);
  }
};
