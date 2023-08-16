"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import User from "../app/models/user.js";
import Image from "../app/models/Image.js";
import CoFounder from "../app/models/coFounder.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveDocumentsToLocal(formData) {
  const files = formData.getAll("file"); 
  const multipleBufferPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      // const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`);
      // fs.writeFile(uploadDir, buffer);
      //dost work with vercel

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `/${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);

      return { filepath: uploadDir, filename: file.name };
    })
  );
  return Promise.all(multipleBufferPromise);
}

async function uploadDocumentsToCloudinary(newFiles) {
  const multipleUploadPromise = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, {
      resource_type: "raw", // Set resource type to "raw" for non-image or PDF files
      folder: "startoz/cv", // Optionally, you can store in a different folder
    })
  );

  return await Promise.all(multipleUploadPromise);
}

export async function uploadCv(formData, sessionEmail) {
  try {
    const newFiles = await saveDocumentsToLocal(formData);
    const documents = await uploadDocumentsToCloudinary(newFiles);
    // Delete local files after upload to Cloudinary
    const localFiles = newFiles.map((file) => file.filepath);
    await Promise.all(localFiles.map((file) => fs.unlink(file)));

    return { document: documents[0].secure_url };
  } catch (error) {
    return { errMsg: error.message };
  }
}