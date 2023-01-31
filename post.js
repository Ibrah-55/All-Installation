import { PrismaClient } from "@prisma/client";
import { marked } from "marked";

const prisma = new PrismaClient();

export async function getPosts(){
        await prisma.$connect()
        const allPosts = await prisma.posts.findMany();
        prisma.$disconnect();
       console.log(allPosts)
        return allPosts;
}
export async function getPost(slug){
    await prisma.$connect();

   const foundSlug = await prisma.blogs.findFirst({
        where: {
            slug: slug
        }
    })

    let title = foundSlug.T.itle;
    let html = marked(foundSlug.markdown)
    prisma.$disconnect();

    return { slug, title, html};
} 