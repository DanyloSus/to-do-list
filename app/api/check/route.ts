//import from libraries
import { NextRequest, NextResponse } from "next/server";

//internal imports
import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB(); // connect db

    const data = await req.json(); // get values
    const { username, email }: { username: string; email: string } = data; // destructuring

    let user = await User.findOne({ username }).select("_id"); // find id by username

    if (!user) {
      // if by username user didn't find
      user = await User.findOne({ email }).select("_id"); // find id by email

      return NextResponse.json({ user, email: true });
    }

    return NextResponse.json({ user, email: false });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
