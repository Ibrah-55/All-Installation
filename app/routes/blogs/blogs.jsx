import React from 'react'
import { getPosts } from 'post'
import { Link, useLoaderData } from '@remix-run/react';


export let loader = () =>{
  return getPosts();
}

function Posts() {
  let posts = useLoaderData();
    return (
        <div>
            <h1>Installation All Docs</h1>
            <p>Install all dependencies in on Place. </p>
            <ul>
               { posts.map(post => (
                    <li className="postList" key={post.slug}>
                        <Link className="postTitle" to={post.slug}>{post.Title}</Link>
                      <br />  
                      <br />
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default Posts;