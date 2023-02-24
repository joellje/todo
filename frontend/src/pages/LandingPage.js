import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(event);

    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });
    const resJson = await res.json();
    console.log(resJson);
    if (res.status === 200) {
      console.log("Logged In!");
      setEmail("");
      setPassword("");
      const now = new Date();
      const item = {
        value: resJson.token,
        expiry: now.getTime() + 600000,
      };

      localStorage.setItem("token", JSON.stringify(item));
      //TODO: redirect to todo
    } else {
      console.log(resJson.messages);
      setError(resJson.messages);
    }
  };

  return (
    <div className="App">
      <h1>
        <p>Log In</p>
      </h1>
      <form>
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
        <input
          type="submit"
          value="Log In"
          className="text-xl mb-2 border-2"
          onClick={handleLogin}
        />
      </form>
      {/* TODO: redirect to signup page if needed */}
    </div>
  );
}

export default LandingPage;
