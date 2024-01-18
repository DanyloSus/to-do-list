import { connectMongoDB } from "@/lib/mongodb/mongodb";
import ToDo from "@/models/To-Do";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { heading, content, attachedId } = await req.json();
  await connectMongoDB();
  await ToDo.create({ heading, content, attachedId });
  return NextResponse.json({ message: "ToDo is created" }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const url = req.url;

  const params = url.split("=")[1];

  console.log("params", params);

  await connectMongoDB();
  const toDos = await ToDo.find({ attachedId: params });
  return NextResponse.json({ toDos });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ToDo.findByIdAndDelete(id);
  return NextResponse.json({ message: "ToDo is deleted" }, { status: 201 });
}
