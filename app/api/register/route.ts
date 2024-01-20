//import from libraries
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

//internal imports
import User from "@/models/User";
import { connectMongoDB } from "@/lib/mongodb/mongodb";

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
