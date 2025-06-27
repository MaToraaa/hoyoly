import { addUsers, deleteUser, getUsers } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("🚀 ~ GET ~ req:", req)
  try {
    const status = await getUsers();
    return NextResponse.json({ success: true, message: status });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const status = await addUsers(data);
    return NextResponse.json({ success: true, message: status });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const status = await deleteUser(data);
    return NextResponse.json({ success: true, message: status });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
