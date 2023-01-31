import { Link } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Footer from "./routes/Footer";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
} from "@remix-run/react";
import styles from "./tailwind.css";
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}

        <NavBar />
        
        
        <Outlet />
      </body>
    </html>
  );
}
