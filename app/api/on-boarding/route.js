import multer from 'multer';
import { connectToDB } from "../../../utils/database";
import User from "../../models/user";
import CoFounder from "../../models/coFounder";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  // Check for missing fields
  const requiredFields = [
    "phoneNumber",
    "profession",
    "lookingToBe",
    "desiredSectors",
    "country",
    "dateOfBirth",
    "aboutMe",
    "experience",
    "skills",
    "personalWeb",
    "linkedInProfileLink",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { message: `${field} is required` },
        { status: 400 }
      );
    }
  }

  // map the arrays of objects to arrays of strings
  body.lookingToBe = body.lookingToBe.map((obj) => obj.value);
  body.desiredSectors = body.desiredSectors.map((obj) => obj.value);
  body.skills = body.skills.map((obj) => obj.value);

  await connectToDB();

  // Check if a user with this email exists
  const existingUser = await User.findOne({ email: body.sessionEmail });

  if (!existingUser) {
    return NextResponse.json(
      { message: "No user with this email exists" },
      { status: 400 }
    );
  }

  // If a user with this email exists, try to find or create a co-founder with this userId
  let existingCoFounder = await CoFounder.findOne({ user: existingUser._id });

  const { sessionEmail, ...bodyWithoutEmail } = body; // Exclude sessionEmail from body

  if (existingCoFounder) {
    // Update the existing co-founder document using the form data
    existingCoFounder = await CoFounder.findOneAndUpdate(
      { user: existingUser._id },
      bodyWithoutEmail, // Update with bodyWithoutEmail
      {
        new: true,
        useFindAndModify: false,
      }
    );
  } else {
    // If no co-founder with this user exists, create a new co-founder document with the form data
    existingCoFounder = await CoFounder.create({
      user: existingUser._id,
      ...bodyWithoutEmail,
    }); // Create with bodyWithoutEmail
  }

  if (!existingCoFounder) {
    return NextResponse.json(
      { message: `Unable to update or create ${body.selectedRole}` },
      { status: 500 }
    );
  }

  // If successful, update the roles field of the User document
  if (!existingUser.roles.includes(body.selectedRole)) {
    existingUser.roles.push(body.selectedRole);
    // existingUser.isFirstVisit = false;  // set isFirstVisit to false
    await existingUser.save();
  }

  return NextResponse.json(existingCoFounder);
}
