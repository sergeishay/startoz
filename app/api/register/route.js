import bcrypt from 'bcrypt';
import { connectToDB } from "../../../utils/database";
import User from '../../models/user';
import { NextResponse } from 'next/server';

export async function POST(request){
    const body =await request.json();
    console.log(body)
    const {username, email, password} = body
    console.log({username, email, password})
    if(!username || !email || !password){
        return  NextResponse.json('missing fields', {status:400})
    }
    await connectToDB();
    const exist = await User.findOne({ email });
    if(exist){
        return  NextResponse.json("Email already exists", {status:400})
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUserRef = await User.create({
        email: email,
        password: hashedPassword,
        username:username,
        image: "",
        isFirstVisit: true,
      });
      return NextResponse.json(newUserRef)
}


