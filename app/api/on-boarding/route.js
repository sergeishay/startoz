import { connectToDB } from "../../../utils/database";
import User from "../../models/user";
import CoFounder from "../../models/coFounder";

import multer from "multer";
import { NextResponse } from "next/server";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/Users/ron mualem/Desktop/StartoZ.com"); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});
const upload = multer({ storage }).single("cv");

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
};

async function handlePostRequest(req, res) {
  await connectToDB();

  try {
    await upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file" });
      }

      const body = req.body;

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
          return res
            .status(400)
            .json({ message: `${field} is required` });
        }
      }

      // Map the arrays of objects to arrays of strings
      const lookingToBe = body.lookingToBe.map((obj) => obj.value);
      const desiredSectors = body.desiredSectors.map((obj) => obj.value);
      const skills = body.skills.map((obj) => obj.value);

      // Check if a user with this email exists
      const existingUser = await User.findOne({ email: body.sessionEmail });

      if (!existingUser) {
        return res
          .status(400)
          .json({ message: "No user with this email exists" });
      }

      // If a user with this email exists, try to find or create a co-founder with this userId
      let existingCoFounder = await CoFounder.findOne({
        user: existingUser._id,
      });

      const { sessionEmail, ...bodyWithoutEmail } = body; // Exclude sessionEmail from body

      if (existingCoFounder) {
        // Update the existing co-founder document using the form data
        existingCoFounder = await CoFounder.findOneAndUpdate(
          { user: existingUser._id },
          { ...bodyWithoutEmail, cv: req.file.path },
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
          cv: req.file.path,
        });
      }

      if (!existingCoFounder) {
        return res
          .status(500)
          .json({ message: `Unable to update or create ${body.selectedRole}` });
      }

      // If successful, update the roles field of the User document
      if (!existingUser.roles.includes(body.selectedRole)) {
        existingUser.roles.push(body.selectedRole);
        await existingUser.save();
      }

      return res.json(existingCoFounder);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export default function handler(req, res) {
  if (req.method === "POST") {
    return handlePostRequest(req, res);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
