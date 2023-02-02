import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  Form, useActionData, useTransition } from "@remix-run/react";


export let loader = () => {
  let data = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions"
      },
      {
        to: "demos/about",
        name: "Nested Routes, CSS loading/unloading"
      },
      {
        to: "demos/params",
        name: "URL Params and Error Boundaries"
      }
    ], 
  };

  return json(data);
};

export let meta = () => {
  return {
    Title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export default function Index() {
  let data = useLoaderData();

  
let transition = useTransition();

  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to OneDocs!</h2>
        <button className="button" >
                <Link to="/blogs">{transition.submission ? "Hang on..." : "Get Started"}</Link>
             </button>  
        <p>
          Get all installation guidelines in one page.
          Available installation for         
          <FontAwesomeIcon icon="fa-brands fa-windows" /> Windows, 
          <FontAwesomeIcon icon="fa-brands fa-apple" /> MacOS and 
          <FontAwesomeIcon icon="fa-brands fa-linux" /> Linux
        </p>
        
        <p>
          Check out all the installation docs and get your project going.
         </p>
         
      </main>
     
         <aside>
        
        <h2>Resources</h2>
        <ul>
          {data.resources.map(resource => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </aside>
      
    </div>
    
  );
}
