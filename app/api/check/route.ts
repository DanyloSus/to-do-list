import { connectMongoDB } from "@/lib/mongodb/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const { username, email }: { username: string; email: string } = data;

    let user = await User.findOne({ username }).select("_id");

    if (!user) {
      user = await User.findOne({ email }).select("_id");

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
