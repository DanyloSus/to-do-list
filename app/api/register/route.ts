import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import User from "@/models/User";

export async function POST(req: NextRequest, res: NextResponse) {
  const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.n9i9gx6.mongodb.net/`;

  let client;

  try {
    client = await mongoose.connect(MONGODB_URI);
    console.log("DB IS CONNECTED");
  } catch (error) {
    console.log("DB IS NOT CONNECTED " + error);
    return NextResponse.json(
      { message: `DB IS NOT CONNECTED ${error}` },
      { status: 501 }
    );
  }

  const data = await req.json();

  const { name, surname, username, email, password } = data;

  if (
    !name ||
    !username ||
    !surname ||
    !email ||
    !password ||
    !email.includes("@") ||
    name.trim() === "" ||
    surname.trim() === "" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    return NextResponse.json(
      { message: `Data is not correct` },
      { status: 422 }
    );
  }

  const newData = {
    ...data,
    date: new Date(),
  };

  try {
    await User.create(newData);
    console.log("User is created");
    return NextResponse.json({ message: "YEAH" }, { status: 201 });
  } catch (error) {
    console.log("User is not created");
    return NextResponse.json(
      { message: `User is not created ${error}` },
      { status: 502 }
    );
  }
}
