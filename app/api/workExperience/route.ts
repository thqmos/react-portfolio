import connectDB from "../../../libs/mongodb";
import WorkExperience from "../../../models/WorkExperience";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  const req = await request.json();
  try {
    const workExperience = await WorkExperience.create(req);
    return NextResponse.json({ message: "Work Experience Created", data: workExperience }, { status: 201 });
  }
  catch (error){
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const workExperiences = await WorkExperience.find();
    return NextResponse.json({ workExperiences });
  }
  catch (error) {
    return NextResponse.json({success: false}, { status: 400});
  }
  
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  try {
    await WorkExperience.findByIdAndDelete(id);
    console.log(id + "from try");
    return NextResponse.json({ message: "Experience deleted" }, { status: 200 });
  }
  catch (error) {
    console.log(id + "from catch");
    return NextResponse.json({ success: false }, { status: 400 });
  }
  
  
}