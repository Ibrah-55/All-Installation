import {  Form, useActionData, useTransition } from "@remix-run/react";
import { createPost } from "post";
import { redirect } from "@remix-run/node";
import React from "react";



export let action = async ({ request }) => {
    let formData = await request.formData();

    let Title = formData.get("Title");
    let slug = formData.get("slug")
    let markdown = formData.get("markdown")
    let Description = formData.get("Description")

    let errors = {};
    if (!Title) errors.Title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;
    if(!Description) errors.Description = true;
    
    if (Object.keys(errors).length) {
        return errors;
    }

    await createPost({Title, slug, Description, markdown});

    return redirect("/admin")
}


export default function NewPost() {
    let errors = useActionData();
    let transition = useTransition();
    let slug = ''

    const handleChange = (e) =>{
        let text = e.target.value 
       slug = text.replace(/\s/g , '-');
       document.getElementById("slugInput").value = slug.toLowerCase();
    }
  return (
      <Form method="post">
          <p>
              <label htmlFor="">
                  Post Title: {" "} {errors?.Title && <em>Title is required</em>} <input onChange={handleChange} type="text" name="Title"/>
              </label>
            </p>
            <p>
                <label htmlFor=""> Post Slug: {" "} {errors?.slug && <em>Slug is required</em>} 
                <input placeholder={slug} id="slugInput" type="text" name="slug"/>
            </label>
            <p>
                <label htmlFor="">Description:</label>{" "} {errors?.Description && <em>Write a Description</em>} 
                <br />
                <input name="Description" id="" type="text"/>
            </p>
            </p>
            <p>
                <label htmlFor="markdown">Installation </label>{" "} {errors?.markdown && <em>Installation is Required</em>} 
                <br />
                <textarea name="markdown" id=""/>
            </p>
            <p>
                <button type="submit" >{transition.submission ? "Creating..." : "Create Post"}</button>
            </p>
      </Form>
  )
}