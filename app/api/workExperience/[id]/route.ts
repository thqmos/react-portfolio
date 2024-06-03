import connectDB from "@/libs/mongodb";
import WorkExperience from "@/models/WorkExperience";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface Params {
    id: string;
  }

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  const req = await request.json();
  await connectDB();
  await WorkExperience.findByIdAndUpdate(id, req);
  return NextResponse.json({ message: "Work Experience updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connectDB();
  const workExperience = await WorkExperience.findOne({ _id: id });
  return NextResponse.json({ workExperience }, { status: 200 });
}