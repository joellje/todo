import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailResetSent, setEmailResetSent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate(`/signup`);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

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
    setLoading(false);
    if (res.status === 200) {
      setEmail("");
      setPassword("");

      localStorage.setItem("token", resJson.token);
      navigate(`/todos`);
    } else {
      setErrors(resJson.messages);
    }
  };

  const handleForgetPassword = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/users/forgetPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
      }),
    });
    const resJson = await res.json();
    if (res.status === 200) {
      setEmail("");
      setErrors([]);
      setEmailResetSent(true);
      setTimeout(() => {
        setEmailResetSent(false);
      }, "3000");
    } else {
      setErrors(resJson.messages);
    }
  };

  return (
    <div className="App">
      <div
        className={`bg-base-200 flex flex-row items-center justify-center align-middle pt-2 ${
          errors.length === 0 ? "hidden" : ""
        }`}
      >
        <div class="alert alert-error shadow-lg w-1/2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errors.map((error) => (
              <span>{error}</span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`bg-base-200 flex flex-row items-center justify-center align-middle pt-2 ${
          emailResetSent ? "" : "hidden"
        }`}
      >
        <div className="alert alert-success shadow-lg w-1/2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>The password reset link has been sent to your email.</span>
          </div>
        </div>
      </div>

      <div class="hero min-h-screen bg-base-200 flex flex-col gap-5 justify-center">
        <h1 class="text-5xl font-bold">Todo</h1>
        <h2 class="text-3xl">
          Streamline your day with a personalized todo app designed for you.
        </h2>

        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => {
                  setErrors([]);
                }}
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => {
                  setErrors([]);
                }}
              />
              <label className="label">
                <button
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={handleForgetPassword}
                >
                  Forgot password?
                </button>
              </label>
            </div>

            <div class="form-control mt-6">
              <button
                class={`btn btn-primary ${loading === true ? "loading" : " "}`}
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                class="btn btn-secondary mt-4"
                onClick={handleSignupRedirect}
              >
                Create new Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
