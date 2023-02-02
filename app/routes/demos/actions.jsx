import { useEffect, useRef } from "react";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

export function meta() {
  return { Title: "Actions Demo" };
}


export let action = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");

  
  if (typeof answer !== "string") {
    return json("Come on, at least try!", { status: 400 });
  }

  if (answer !== "egg") {
    return json(`Sorry, ${answer} is not right.`, { status: 400 });
  }

  
  return redirect("/demos/correct");
};

export default function ActionsDemo() {
  // https://remix.run/api/remix#useactiondata
  let actionMessage = useActionData();
  let answerRef = useRef(null);

  // This form works without JavaScript, but when we have JavaScript we can make
  // the experience better by selecting the input on wrong answers! Go ahead, disable
  // JavaScript in your browser and see what happens.
  useEffect(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);

  return (
    <div className="remix__page">
      <main>
        <h2>Actions!</h2>
        <p>
          This form submission will send a post request that we handle in our
          `action` export. Any route can export an action to handle data
          mutations.
        </p>
        <Form method="post" className="remix__form">
          <h3>Post an Action</h3>
          <p>
            <i>What is more useful when it is broken?</i>
          </p>
          <label>
            <div>Answer:</div>
            <input ref={answerRef} name="answer" type="text" />
          </label>
          <div>
            <button>Answer!</button>
          </div>
          {actionMessage ? (
            <p>
              <b>{actionMessage}</b>
            </p>
          ) : null}
        </Form>
      </main>

      <aside>
        <h3>Additional Resources</h3>
        <ul>
          <li>
            Guide:{" "}
            <a href="https://remix.run/guides/data-writes">Data Writes</a>
          </li>
          <li>
            API:{" "}
            <a href="https://remix.run/api/conventions#action">
              Route Action Export
            </a>
          </li>
          <li>
            API:{" "}
            <a href="https://remix.run/api/remix#useactiondata">
              <code>useActionData</code>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}