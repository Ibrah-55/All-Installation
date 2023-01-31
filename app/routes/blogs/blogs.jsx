import React from 'react'
import { getPosts } from 'post'
import { Link, useLoaderData } from '@remix-run/react';

export let loader = () =>{
  return getPosts();
}

function Blogs() {
  let posts = useLoaderData();
    return (
        <div>
            <h1>My Remix Blog</h1>
            <p>Click on the post name to read the post</p>
            <ul>
                {posts.map(post => (
                    <li className="postList" key={post.slug}>
                        <Link className="postTitle" to={post.slug}>{post.Title}</Link>
                      <br />  
                      <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blogs