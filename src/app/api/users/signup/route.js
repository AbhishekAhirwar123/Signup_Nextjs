import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

// export async function POST(request : NextRequest){
export async function POST(){
    try {
        const reqBody = await request.json()
        const {firstname,lastname, email, number,gender, password,confirmpassword} = reqBody

        console.log(reqBody);

        // check if user already exists.
        const user = await User.findOne({email})
        
        if(user){
            return NextResponse.json({error: "User Already Exists"}, {status: 400})
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            number,
            gender,
            password,
            confirmpassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User Created Successfully !!",
            success: true,
            savedUser
        })

    } catch (error) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}