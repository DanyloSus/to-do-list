import { connectMongoDB } from "@/lib/mongodb/mongodb";
import ToDo from "@/models/To-Do";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json(); // get values
  const { heading, content, attachedId } = data; // destructuring
  try {
    await connectMongoDB(); // connect db
    await ToDo.create({ heading, content, attachedId }); // create ToDo
    return NextResponse.json({ message: "ToDo is created" }, { status: 201 });
  } catch (error) {
    console.log("Didn't create ToDo");
    return NextResponse.json(
      { message: `Didn't create ToDo ${error}` },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest) {
  const attachedId = req.nextUrl.searchParams.get("attachedId"); // get param

  try {
    await connectMongoDB(); // connect db
    const toDos = await ToDo.find({ attachedId }); // find ToDos by attachedId
    return NextResponse.json({ toDos }); // return ToDos
  } catch (error) {
    console.log("Didn't find ToDos");
    return NextResponse.json(
      { message: `Didn't find ToDos ${error}` },
      { status: 502 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id"); // get param

  try {
    await connectMongoDB(); // connect db
    await ToDo.findByIdAndDelete(id); // delete ToDo
    return NextResponse.json({ message: "ToDo is deleted" }, { status: 201 });
  } catch (error) {
    console.log("Didn't delete ToDo");
    return NextResponse.json(
      { message: `Didn't delete ToDo ${error}` },
      { status: 502 }
    );
  }
}
