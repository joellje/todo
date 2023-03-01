import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate(`/`);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

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
    setLoading(false);
    if (res.status === 201) {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      navigate("/");
    } else {
      setErrors(resJson.messages);
    }
  };

  return (
    <div className="App">
      <div
        className={`bg-inherit flex flex-row items-center justify-center align-middle my-2 ${
          errors === "" ? "hidden" : ""
        }`}
      >
        <div class={`alert alert-error shadow-lg w-1/2 `}>
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
        class="tooltip tooltip-left fixed top-3 right-3"
        data-tip="Back to Login"
      >
        <button class="btn btn-square" onClick={handleLoginRedirect}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="hero min-h-screen bg-base-200 flex flex-col gap-5 justify-center">
        <h1 class="text-5xl font-bold">Sign Up!</h1>
        <h2 class="text-3xl">
          Sign up now for a smarter way to organize your life and accomplish
          your goals.
        </h2>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Confirm your Password</span>
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <div class="form-control mt-6">
              <button
                class={`btn btn-primary ${loading === true ? "loading" : " "}`}
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
