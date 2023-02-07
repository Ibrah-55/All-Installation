import { useLoaderData, Link, Form, useActionData, useTransition } from "@remix-run/react";
import { json } from "@remix-run/node";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export let loader = () => {
  let data = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "Learn React",
        url: "https://reactjs.org/tutorial/tutorial.html"
      },
      {
        name: "Learn Javascript",
        url: "https://learnjavascript.online/"
      },
      {
        name: "Learn Python",
        url: "https://www.learnpython.org/"
      },
      {
        name: "SQL",
        url: "https://www.codecademy.com/learn/learn-sql"
      },
      {
        name: "AWS Training",
        url: "https://www.aws.training/"
      },
    ],
    install:[
      {
        name:"Node Installation", 
        descrip: "Node.js is a server-side built JavaScript language. Node.js is especially well-suited to serving client queries made via an API; therefore, it's ideal for Single Page Applications (SPAs) running on clients like laptops or smartphones.",
        text:"Visit",
        url: "https://nodejs.org/en/download/" ,
        windows2: " to download, open and continue with the installation. Verify installation by typing in the powershell:",
        codeSnip1: "node -v",
        codeSnip2: "npm -v",
        macOS: "On MacOS",
        


      },
      {
        name:"Pip Installation", 
        descrip: "Pip is a package-management system written in Python and is used to install and manage software packages. The Python Software Foundation recommends using pip for installing Python applications and its dependencies during deployment.",
        text:"Open command prompt or terminal and use the following commands to install and verify. For more information visit: ",
        url2: "https://pip.pypa.io/en/stable/installation/" ,
        codeSnip1: "python -m pip install -U pip",
        py3:"If you are using python3 use this command",
        codeSnip2: "python3 -m pip install -U pip",
        verify:"Verify installation through: ",
        codeSnip3: "pip --version",
        verify2:"Or ",
        codeSnip4:"pip3 --version",

        getStarted:"More"

      },
    
      
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions"
      },
      // {
      //   to: "demos/about",
      //   name: "Nested Routes, CSS loading/unloading"
      // },
      // {
      //   to: "demos/params",
      //   name: "URL Params and Error Boundaries"
      // }
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

  
  let transitions = useTransition();

  return (
    <div className="remix__page">
      <main>
        <h2>Welcome to OneDocs!</h2>

  
        <p>
          Get all installation guidelines in one page.
          Available installation for         
          <FontAwesomeIcon icon={ "faWindows"}/> Windows, 
          <FontAwesomeIcon icon="fa-brands fa-apple" /> MacOS and 
          <FontAwesomeIcon icon="fa-brands fa-linux" /> Linux
        </p>
        
        <p>
          Check out all the installation docs and get your project going.
         </p>
         
         
      </main>
      <aside>
        
        <h4>Check This Out!!</h4>
        <ul>
          {data.install.map(installs=> (
            <li key={installs.url} className="remix__page__resource">
              <a href={installs.url}>{installs.name}</a>
              <br />
              {installs.descrip}
              <br />
             {installs.text} <a href={installs.url}>installation</a> {installs.windows2} 
              <pre class="line-numbers">
   <code class="language-css">
       { installs.codeSnip1 }
       <p>
        {installs.verify2}
       </p>
        { installs.codeSnip2 }
       <p>
        {installs.verify}
       </p>
       {installs.codeSnip3}
       <p>
        {installs.verify2}
       </p>
       {installs.codeSnip4}
       <br />
      

   </code>
   </pre>
   
            </li>
          ))}
        
   
        </ul>
        <button className="button" type="">
                <Link to="/blogs">{transitions.submission ? "Hang on..." : "All documentations"}</Link>
             </button> 
         
      </aside>

      <aside>
         <p>
        Don't know where to start? Check these out.
        </p>
        
        <h5>Resources</h5>
        <ul>
          {data.resources.map(resource => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
        
      </aside>
      <aside>
      <h4>Added</h4>
        <ul>
          {data.demos.map(demo=> (
            <li key={demo.to} className="remix__page__resource">
              <a href={demo.to}>{demo.name}</a>
            
              
   
            </li>
          ))}
        
   
        </ul>
      </aside>
      
      
    </div>
    
    
  );
}
