import { connectMongoDB } from "@/lib/mongodb/mongodb";
import ToDo from "@/models/To-Do";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const { newHeading: heading, newContent: content } = await req.json();
  await connectMongoDB();
  await ToDo.findByIdAndUpdate(slug, { heading, content });
  return NextResponse.json({ message: "ToDo is updated" }, { status: 201 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  await connectMongoDB();
  const topic = await ToDo.findOne({ _id: slug });
  return NextResponse.json({ topic });
}
