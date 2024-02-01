//internal imports
import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";

//import from libraries
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB(); // connect db
    const data = await req.json(); // get values
    const { userId, password, newPassword } = data; // destructuring

    let user = await User.findOne({ _id: userId }).select("password"); // find password by user's id

    console.log(user);
    const isCorrectPasswords = await bcrypt.compare(password, user.password); // check is current password equal hashed password on DB

    if (isCorrectPasswords) {
      const hashedPassword = await bcrypt.hash(newPassword, 10); // hash new password

      // find by id and update
      await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });

      return NextResponse.json({ message: "User is updated" }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "User didn't update" },
        { status: 422 }
      );
    }
  } catch (error) {
    console.log("User didn't update");

    return NextResponse.json(
      { message: `User didn't update ${error}` },
      { status: 502 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDB(); // connect db
    const id = req.nextUrl.searchParams.get("id"); // get param

    await User.findByIdAndDelete(id); // find by user's id and delete it

    return NextResponse.json({ message: "User is deleted" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "User isn't deleted" },
      { status: 500 }
    );
  }
}
