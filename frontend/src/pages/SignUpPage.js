import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log(event);

    const res = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
        passwordConfirm: `${passwordConfirm}`,
      }),
    });
    const resJson = await res.json();
    if (res.status === 201) {
      console.log("Created Account!");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      //TODO: redirect to login
    } else {
      console.log(resJson.messages);
      setError(resJson.messages);
    }
  };

  return (
    <div className="App">
      <h1>
        <p>Sign Up</p>
      </h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm your password:
          <input
            type="text"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Sign Up"
          className="text-xl mb-2 border-2"
          onClick={handleSignup}
        />
      </form>
    </div>
  );
}

export default LandingPage;
