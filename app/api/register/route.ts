//import from libraries
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//internal imports
import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectMongoDB(); // connect db

  const data = await req.json(); // get values

  const { name, surname, username, email, password } = data; // destructuring

  if (
    // server side validation
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

  // hash password
  const hashedPasword = await bcrypt.hash(password, 10);

  // add new password
  const newData = {
    ...data,
    password: hashedPasword,
  };

  try {
    await User.create(newData); // create one user

    console.log("User is created");

    return NextResponse.json({ message: "User is created" }, { status: 201 });
  } catch (error) {
    console.log("User is not created");

    return NextResponse.json(
      { message: `User is not created ${error}` },
      { status: 502 }
    );
  }
}
