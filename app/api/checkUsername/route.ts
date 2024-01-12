import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const { username }: { username: string } = data;

    const user = await User.findOne({ username }).select("_id");

    console.log("user: ", user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
