import prisma from "@/app/lib/prisma";
import * as bcrypt from 'bcrypt';

interface ReuqestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: ReuqestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
        email: body.username,
    }
  })

  if(user && (await bcrypt.compare(body.password, user.password))) {
    const {password, ...useWithoutPass} = user;
    return new Response(JSON.stringify(useWithoutPass));
  }

  else {
    const res = await fetch(process.env.NEXTAUTH_URL + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: body.username,
        email: body.username,
        password: body.password,
      })
    })

    const user = await res.json()

    return new Response(JSON.stringify(user));
  }
}
