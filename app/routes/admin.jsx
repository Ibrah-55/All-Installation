import { Outlet, Link, useLoaderData } from '@remix-run/react';
import { getPosts } from "post";
import adminStyles from "~/styles/admin.css";

export let links = () => {
    return [{rel: "stylesheet", href: adminStyles}]
}

export let loader = () => {
    return getPosts();
}

export default function Admin() {
    let posts = useLoaderData();
    return (
        <div className="admin">
            <h1 className="adminTitle">Admin</h1>
           
            <nav>
             <p>Click on a post to edit the blog post</p>
               
                <ul>
                    {posts.map(post => (
                        <li key={post.slug}>
                        <Link to={post.slug}>{post.Title}</Link>
                        </li>
                    ))}
                </ul>
                <main>  
                    <Outlet />
                </main>
            </nav>
           
        </div>
    )
}