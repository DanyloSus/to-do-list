import { connectMongoDB } from "@/lib/mongodb/mongodb";
import ToDo from "@/models/To-Do";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const {
    newHeading: heading,
    newContent: content,
    attachedId,
  } = await req.json();

  await connectMongoDB();
  await ToDo.findByIdAndUpdate(slug, { heading, content, attachedId });
  return NextResponse.json({ message: "ToDo is updated" }, { status: 201 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  await connectMongoDB();
  const toDo = await ToDo.findOne({ _id: slug });
  return NextResponse.json({ toDo });
}
