import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // you could some data validation here with yup or zod, 
  // we already did it in the client so i will skip it here
  // ...

  // see if the email is already in use
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json(
      { error: "Email already in use!" },
      { status: 409 }
    );

    // hash user password and insert into the database
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });

  // Don't send the hashed password back to the client
  return NextResponse.json({name: newUser.name, email: newUser.email}, {status: 201})
}
