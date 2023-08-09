// import { connectToDB } from "@/utils/database";
// import Image from '../../models/image'
// import nextConnect from "next-connect";
// import { NextResponse } from 'next/server';

// export async function POST(request){
//     const body =await request.json();
//     console.log(body)


//     const { email,image} = body
//     await connectToDB();
//     const exist = await User.findOne({ email });
//     if(exist){

//         // const imageUpload = await Image.create({
//     }

//     const hashedPassword = await bcrypt.hash(password,10);
//     const newUserRef = await User.create({
//         email: email,
//         password: hashedPassword,
//         username:username,
//         image: "",
//         isFirstVisit: true,
//       });
//       return NextResponse.json(newUserRef)
// }
