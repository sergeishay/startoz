import multer from "multer";
import { connectToDB } from "../../../utils/database";
import User from "../../models/user";
import CoFounder from "../../models/coFounder";
import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

// Initialize the Storage object using Application Default Credentials
const storage = new Storage();

// Create a multer storage object to configure the file destination and filename
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage }).single("cv");

export async function POST(request) {
  console.log("line 16");
  return new Promise((resolve, reject) => {
    upload(request, null, async (error) => {
      if (error) {
        console.error("Error uploading CV:", error);
        return reject(
          NextResponse.json(
            { message: "Error uploading CV file" },
            { status: 500 }
          )
        );
      }

      console.log("Uploaded file:", request.file); // New log here

      console.log("line 28");
      let body = request.body;
      console.log("Request body:", body); // New log here

      // parse JSON fields back into objects
      const jsonFields = ["desiredSectors", "lookingToBe", "skills"];
      for (const field of jsonFields) {
        if (body[field]) {
          body[field] = JSON.parse(body[field]);
        }
      }

      console.log("Parsed body:", body); // New log here
      // Check for missing fields
      console.log(body + " line 39");
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
      console.log("line 45");

      for (const field of requiredFields) {
        if (!body[field]) {
          return reject(
            NextResponse.json(
              { message: `${field} is required` },
              { status: 400 }
            )
          );
        }
      }

      // map the arrays of objects to arrays of strings
      body.lookingToBe = body.lookingToBe.map((obj) => obj.value);
      body.desiredSectors = body.desiredSectors.map((obj) => obj.value);
      body.skills = body.skills.map((obj) => obj.value);

      await connectToDB();
      console.log(body.sessionEmail);
      console.log("line 63");
      // Check if a user with this email exists
      const existingUser = await User.findOne({ email: body.sessionEmail });
      console.log(existingUser);
      if (!existingUser) {
        return reject(
          NextResponse.json(
            { message: "No user with this email exists" },
            { status: 400 }
          )
        );
      }
      console.log("line 80");

      // If a user with this email exists, try to find or create a co-founder with this userId
      let existingCoFounder = await CoFounder.findOne({
        user: existingUser._id,
      });

      const { sessionEmail, ...bodyWithoutEmail } = body; // Exclude sessionEmail from body
      console.log("line 82");
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
        return reject(
          NextResponse.json(
            { message: `Unable to update or create ${body.selectedRole}` },
            { status: 500 }
          )
        );
      }
      console.log("line 107");
      if (request.file) {
        try {
          // Upload the CV file to Google Cloud Storage
          const bucketName = "startoz"; // Replace with your bucket name
          const fileName = request.file.originalname;
          const fileBlob = request.file.buffer;

          const bucket = storage.bucket(bucketName);
          const fileUpload = bucket.file(fileName);

          const blobStream = fileUpload.createWriteStream({
            resumable: false,
            contentType: request.file.mimetype,
          });

          blobStream.on("error", (error) => {
            console.error("Error uploading CV:", error);
            return reject(
              NextResponse.json(
                { message: "Error uploading CV file" },
                { status: 500 }
              )
            );
          });

          blobStream.on("finish", async () => {
            console.log("CV uploaded successfully.");

            // Generate a signed URL for the uploaded file
            const signedUrl = await fileUpload.getSignedUrl({
              action: "read",
              expires: "01-01-2024", // Replace with your desired expiry date
            });

            // Store the signed URL in the user's document
            existingUser.URL = signedUrl[0];
            await existingUser.save();

            // Update the roles field of the User document
            if (!existingUser.roles.includes(body.selectedRole)) {
              existingUser.roles.push(body.selectedRole);
              await existingUser.save();
            }

            return resolve(NextResponse.json(existingCoFounder));
          });

          blobStream.end(fileBlob);
        } catch (error) {
          console.error("Error uploading CV:", error);
          return reject(
            NextResponse.json(
              { message: "Error uploading CV file" },
              { status: 500 }
            )
          );
        }
      } else {
        // If no CV file is provided
        // Update the roles field of the User document
        if (!existingUser.roles.includes(body.selectedRole)) {
          existingUser.roles.push(body.selectedRole);
          // existingUser.isFirstVisit = false;  // set isFirstVisit to false
          await existingUser.save();
        }

        return resolve(NextResponse.json(existingCoFounder));
      }
    });
  });
}
