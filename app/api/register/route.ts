import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb/mongodb";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectMongoDB();

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

  const hashedPasword = await bcrypt.hash(password, 10);

  const newData = {
    ...data,
    password: hashedPasword,
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
