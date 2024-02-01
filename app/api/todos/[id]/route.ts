//import from libraries
import { NextRequest, NextResponse } from "next/server";

//internal imports
import { connectMongoDB } from "@/lib/mongodb/mongodb";
import { ParamsIdType } from "@/types/types";
import ToDo from "@/models/To-Do";

export async function PUT(req: NextRequest, { params }: ParamsIdType) {
  const { id } = params; // get params
  const data = await req.json(); // get values
  const {
    newHeading: heading,
    newContent: content,
    attachedId,
    newDateTime: dateTime,
    newStatus: status,
  } = data; // destructuring

  try {
    await connectMongoDB(); // connect db

    await ToDo.findByIdAndUpdate(id, {
      heading,
      content,
      attachedId,
      status,
      dateTime,
    }); // update user's info

    return NextResponse.json({ message: "ToDo is updated" }, { status: 201 });
  } catch (error) {
    console.log("ToDo didn't update");

    return NextResponse.json(
      { message: `ToDo didn't update ${error}` },
      { status: 502 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // get params

  try {
    await connectMongoDB(); // connect db

    const toDo = await ToDo.findOne({ _id: id }); // find ToDo by id

    return NextResponse.json({ toDo }); // return ToDo
  } catch (error) {
    console.log("Didn't find user");

    return NextResponse.json(
      { message: `Didn't find user ${error}` },
      { status: 502 }
    );
  }
}
