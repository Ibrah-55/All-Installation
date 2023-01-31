import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPosts(){
    await prisma.$connect();

    const allPosts = await prisma.posts.findMany();

    prisma.$disconnect();

    console.log(allPosts);
    return allPosts;

}