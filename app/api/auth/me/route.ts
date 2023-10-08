import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { COOKIES } from "@/constants";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIES.TOKEN);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);

    const response = {
      user: "Super Top Secret User",
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
