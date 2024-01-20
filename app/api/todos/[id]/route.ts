import { connectMongoDB } from "@/lib/mongodb/mongodb";
import ToDo from "@/models/To-Do";
import { ParamsIdType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: ParamsIdType) {
  const { id } = params;
  const {
    newHeading: heading,
    newContent: content,
    attachedId,
  } = await req.json();

  await connectMongoDB();
  await ToDo.findByIdAndUpdate(id, { heading, content, attachedId });
  return NextResponse.json({ message: "ToDo is updated" }, { status: 201 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();
  const toDo = await ToDo.findOne({ _id: id });
  return NextResponse.json({ toDo });
}
