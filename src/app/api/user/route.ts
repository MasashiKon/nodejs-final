import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt"

interface ReuqestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(request:Request) {

    const body: ReuqestBody = await request.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result))
}