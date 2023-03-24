import React from 'react'
import { Link, useLoaderData } from "@remix-run/react";

export default function Data(data) {
    let posts = useLoaderData();
    let datas =JSON.stringify(posts)
    return datas;
 
}
