import { React, useState } from 'react'
import data from  "./ListData.json"
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "post";
import Data from './Data'
export let loader = () => {
    return getPosts();
  };

export let Name = () => {
    let posts = useLoaderData();
    let datas =JSON.stringify(posts)
    return datas;
  
}

function App(props) {
    const filteredData =data.filter((el) => {
        if (props.input === '') {
            return '';
        } else {
            return (
                el.Title.toLowerCase().includes(props.input) ||
                el.status.toLowerCase().includes(props.input)
            )
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.Title}> 
                    <div className="postList " key={item.slug}>
                        <Link to={item.slug}><li className=''>{item.Title}</li>  </Link>
       
                       
                    </div>
                
</li>
            ))}
        </ul>
    )
}

export default App;