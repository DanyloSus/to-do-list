import { connectMongoDB } from "@/lib/mongodb/mongodb";
import ToDo from "@/models/To-Do";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { heading, content } = await req.json();
  await connectMongoDB();
  await ToDo.create({ heading, content });
  return NextResponse.json({ message: "ToDo is created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const toDos = await ToDo.findOne();
  return NextResponse.json({ toDos });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ToDo.findByIdAndDelete(id);
  return NextResponse.json({ message: "ToDo is deleted" }, { status: 201 });
}
