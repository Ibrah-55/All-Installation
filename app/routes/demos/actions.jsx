import { useEffect, useRef } from "react";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

export function meta() {
  return { Title: "Actions Demo" };
}


export let action = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");
  answer = answer.toLowerCase();

  
  if (typeof answer !== "string") {
    return json("Come on, at least try!", { status: 400 });
  }

  if (answer !== "egg" || answer!=="egg") {
    return json(`Sorry, ${answer} is not right.`, { status: 400 });
  }

  
  return redirect("/demos/correct");
};

export default function ActionsDemo() {
  let actionMessage = useActionData();
  let answerRef = useRef(null);

  useEffect(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);

  return (
    <div className="remix__page">
      <main>
        <h2>Actions</h2>
        <p>
        Actions are a plain JavaScript object that contains information. Actions are the only source of information for the store. Actions have a type field that tells 
        what kind of action to perform and all other fields contain information or data.
          </p>
         
        <Form method="post" className="remix__form">
          <h3>Try this one</h3>
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
            Redux:{" "}
            <a href="https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers">State, Actions and Reducers</a>
          </li>
          <li>
            API:{" "}
            <a href="https://remix.run/api/conventions#action">
              Route Action Export
            </a>
          </li>
                  </ul>
      </aside>
    </div>
  );
}