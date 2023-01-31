import React from 'react';
import { Link, useLoaderData } from 'remix';


import { getPosts } from 'post';
export let loader = () => {
    return getPosts();
}
function blogs() {
  return (
    <div>blogs</div>
  )
}

export default blogs