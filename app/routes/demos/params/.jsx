import { useCatch, Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";


export let loader = async ({ params }) => {

  if (params.id === "this-record-does-not-exist") {
   
    throw new Response("Not Found", { status: 404 });
  }

 
  if (params.id === "shh-its-a-secret") {
    
    throw json({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }

  if (params.id === "kaboom") {
    lol();
  }

  return { param: params.id };
};

export default function ParamDemo() {
  let data = useLoaderData();
  return (
    <h1>
      The param is <i style={{ color: "red" }}>{data.param}</i>
    </h1>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      );
    case 404:
      message = (
        <p>Looks like you tried to visit a page that does not exist.</p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta = ({ data }) => {
  return {
    Title: data ? `Param: ${data.param}` : "Oops...",
  };
};