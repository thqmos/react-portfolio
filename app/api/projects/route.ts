import connectDB from "../../../libs/mongodb";
import Project from "../../../models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  const req = await request.json();
  try {
    const project = await Project.create(req);
    return NextResponse.json({ message: "Project Created", data: project }, { status: 201 });
  }
  catch (error){
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const projects = await Project.find();
    return NextResponse.json({ projects });
  }
  catch (error) {
    return NextResponse.json({success: false}, { status: 400});
  }
  
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  try {
    await Project.findByIdAndDelete(id);
    console.log(id + "from try");
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  }
  catch (error) {
    console.log(id + "from catch");
    return NextResponse.json({ success: false }, { status: 400 });
  }
  
  
}