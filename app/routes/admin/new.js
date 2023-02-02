import {  Form, useActionData, useTransition } from "@remix-run/react";
import { createPost } from "post";
import { redirect } from "@remix-run/node";


export let action = async ({ request }) => {
    let formData = await request.formData();

    let Title = formData.get("Title");
    let slug = formData.get("slug")
    let markdown = formData.get("markdown")

    let errors = {};
    if (!Title) errors.Title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;
    
    if (Object.keys(errors).length) {
        return errors;
    }

    await createPost({Title, slug, markdown});

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
            </p>
            <p>
                <label htmlFor="markdown">Markdown:</label>{" "} {errors?.markdown && <em>Markdown is required</em>} 
                <br />
                <textarea name="markdown" id="" rows={20} cols={30}/>
            </p>
            <p>
                <button type="submit">{transition.submission ? "Creating..." : "Create Post"}</button>
            </p>
      </Form>
  )
} 