import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import User from "../../models/user"; 
import CoFounder from "../../models/coFounder";
import Service from "../../models/services";
import Investor from "../../models/investors";
import Entrepreneur from "../../models/entrepreneurs";

async function parseRequestBody(request) {
  const { readable, writable } = new TransformStream();
  request.body.pipeTo(writable);
  const reader = readable.getReader();
  let chunks = [];
  let done, value;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      chunks.push(value);
    }
  }
  const decoder = new TextDecoder();
  const json = chunks.map((chunk) => decoder.decode(chunk)).join("");
  return JSON.parse(json);
}




export async function POST(request) {
  let body = await parseRequestBody(request);
  console.log("Request body:", body);
  await connectToDB();

  // Check if a user with this email exists
  const existingUser = await User.findOne({ email: body.email });
  console.log("Existing user:", existingUser);
  if (!existingUser) {
    return NextResponse.json(
      { message: "No user with this email exists" },
      { status: 400 }
    );
  }

  const userRole = body.selectedRole;
  console.log(userRole);

  let newProfile;
  switch (userRole) {
    case "Co-founder":
      newProfile = new CoFounder({
        user: existingUser._id,
        ...body, // Spread the body to fill in the fields
      });
      break;
    case "Providers services":
      newProfile = new Service({
        user: existingUser._id,
        ...body,
      });
      break;
    case "Investors":
      newProfile = new Investor({
        user: existingUser._id,
        ...body,
      });
      break;
    case "Entrepreneur":
      newProfile = new Entrepreneur({
        user: existingUser._id,
        ...body,
      });
      break;
    default:
      return NextResponse.json(
        { message: "Invalid role selected" },
        { status: 400 }
      );
  }

  await newProfile.save();

  // Update the user's roles
  existingUser.roles.push(userRole);
  existingUser.isFirstVisit = false;
  await existingUser.save();

  return NextResponse.json({ message: "Profile updated successfully", userData: newProfile });
}
