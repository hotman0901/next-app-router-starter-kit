import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { COOKIES } from "@/constants";

export async function GET() {
  const cookieStore = cookies();

  const token = (await cookieStore)?.get(COOKIES.TOKEN);

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
  } catch (error) {
    if (error instanceof Error) {
      // 只有在 error 是 JS Error 物件時才會執行
      console.error(error.message);
      
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
}
