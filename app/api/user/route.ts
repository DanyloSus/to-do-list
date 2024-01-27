import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB(); // connect db
    const data = await req.json(); // get values
    const { userId, password, newPassword } = data; // destructuring

    let user = await User.findOne({ _id: userId }).select("password"); // find id by username

    console.log(user);
    const isCorrectPasswords = await bcrypt.compare(password, user.password);

    if (isCorrectPasswords) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
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
    await connectMongoDB();
    const id = req.nextUrl.searchParams.get("id"); // get param

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User is deleted" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "User isn't deleted" },
      { status: 500 }
    );
  }
}
