import { PrismaClient } from '@prisma/client'
import { marked } from "marked";
const prisma = new PrismaClient();



export async function getPost(slug){
    await prisma.$connect();

   const foundSlug = await prisma.posts.findFirst({
        where: {
            slug: slug
        }
    })
    let id = foundSlug.id
    let title = foundSlug.Title;
    let html = marked(foundSlug.markdown)
    prisma.$disconnect();

    return { id, slug, title, html};
}

export async function getPostEdit(slug){
    await prisma.$connect();

   const foundSlug = await prisma.posts.findFirst({
        where: {
            slug: slug
        }
    })
    let id = foundSlug.id
    let title = foundSlug.Title;
    let markdown = foundSlug.markdown
    prisma.$disconnect();

    return { id, slug, title, markdown};
}

export async function createPost(post){
    await prisma.$connect()
    await prisma.posts.create({
        data: {
            title: post.Title,
            slug: post.slug,
            markdown: post.markdown
        }
    })

    prisma.$disconnect();
    return getPost(post.slug)    
}

export async function updatePost(post){
    await prisma.$connect()
    console.log('updatePost id', post.id)
    await prisma.posts.update({
        where: {
            id: post.id
        },
        data: {
            title: post.Title,
            slug: post.slug,
            markdown: post.markdown
        }
    })

    prisma.$disconnect();
    return getPost(post.slug)    
}

export async function getPosts(){
        await prisma.$connect()
        const allPosts = await prisma.posts.findMany();
    prisma.$disconnect();
        return allPosts;
}