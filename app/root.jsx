import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  
} from "@remix-run/react";
import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import styles from '~/styles/app.css';
import React from "react";
export let links = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    }
  ];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <Document Title="Error!">
      <Layout>
        <div>
          <h1>Experienced an  error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Error occurred above
          </p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Page does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document Title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({ children, Title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {Title ? <title>{Title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}




function Layout({ children }) {

  // const [user, setUser] = React.useState(null);
  // const handleLogin = () => setUser({id:1, name: 'Genesis'})
  return (
    <div className="remix-app">
       <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blogs">Docs</Link>
              </li>
              <li>
                {/* { <Link to="/admin">Admin</Link> */}
             </li>
             
              <li>
             
              </li>
            </ul>
          </nav>
        </div>
      </header> 
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>&copy; Jarvis 2023</p>
        </div>
      </footer>
    </div>
  );
}
