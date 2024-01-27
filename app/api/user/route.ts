import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB(); // connect db
    const data = await req.json(); // get values
    const { userId, password, newPassword } = data; // destructuring

    let user = await User.findOne({ _id: userId }).select("password"); // find id by username

    console.log(user);
    if (password === user.password) {
      await User.findByIdAndUpdate(userId, {
        password: newPassword,
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
