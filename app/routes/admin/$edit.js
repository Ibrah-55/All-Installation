import invariant from 'tiny-invariant';
import { getPostEdit } from "post";
import { Form, useActionData, useTransition, useLoaderData } from "@remix-run/react";
import { updatePost } from "post";
import { redirect } from '@remix-run/node';


export let loader = async({params}) => {
    invariant(params.edit, "expected params.edit");
    return getPostEdit(params.edit);
}

export let action = async ({ request }) => {
    let formData = await request.formData();

    let Title = formData.get("Title");
    let slug = formData.get("slug")
    let Description = formData.get("Description")
    let markdown = formData.get("markdown")
    let id = formData.get("id");

    let errors = {};
    if (!Title) errors.Title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;
    if (!Description) errors.Description = true;
    if (Object.keys(errors).length) {
        return errors;
    }

    console.log('calling updatePost with id, Title, slug, markdown: ', id, Title, slug,Description, markdown)
    await updatePost({id, Title, slug, Description, markdown});

    return redirect("/admin")
}

export default function PostSlug() {
    let errors = useActionData();
    let transition = useTransition();
    let post = useLoaderData();
    return (
            <Form method="post">
                <p>
                    <input className="hiddenBlogID" name="id" defaultValue={post.id}>
                    </input>
                </p>
                <p>
                    <label htmlFor="">
                        Post Title: {" "} {errors?.Title && <em>Title is required</em>} <input type="text" name="Title" defaultValue={post.Title}/>
                    </label>
                  </p>
                  <p>
                      <label htmlFor=""> Post Slug: {" "} {errors?.slug && <em>Slug is required</em>} 
                      <input defaultValue={post.slug} id="slugInput" type="text" name="slug"/>
                  </label>
                  </p>
                  <p>
                <label htmlFor="">Description:</label>{" "} {errors?.Description && <em>Write a Description</em>} 
                <br />
                <input name="Description" id="" type="text"/>
            </p>
            <p>
                <label htmlFor="markdown">Installation </label>{" "} {errors?.markdown && <em>Installation is Required</em>} 
                <br />
                <textarea name="markdown" id=""/>
            </p>
                  <p>
                      <button type="submit">{transition.submission ? "Updating..." : "Update Post"}</button>
                  </p>
            </Form>
        )
}                                                                                                