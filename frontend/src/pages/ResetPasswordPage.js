import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [emailResetSuccess, setEmailResetSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  let navigate = useNavigate();

  const handleTodoRedirect = () => {
    navigate(`/todos`);
  };

  const handlePasswordResetSuccess = () => {
    setEmailResetSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setTimeout(() => {
      setEmailResetSuccess(false);
      navigate(`/todos`);
    }, "3000");
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (currentPassword === newPassword) {
      setErrors([
        "Your new password cannot be the same as your current password.",
      ]);
      return;
    }
    setLoading(true);

    const res = await fetch("http://localhost:5000/users/updatePassword", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        passwordCurrent: `${currentPassword}`,
        password: `${newPassword}`,
        passwordConfirm: `${newPasswordConfirm}`,
      }),
    });
    const resJson = await res.json();
    setLoading(false);
    if (res.status === 200) {
      localStorage.setItem("token", resJson.token);
      handlePasswordResetSuccess();
    } else {
      setErrors(resJson.messages);
    }
  };

  return (
    <>
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
          emailResetSuccess ? "" : "hidden"
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
            <span>
              Your password has been reset. You will be redirected soon.
            </span>
          </div>
        </div>
      </div>
      <div
        class="tooltip tooltip-left fixed top-3 right-3"
        data-tip="Back to Todos"
      >
        <button class="btn btn-square" onClick={handleTodoRedirect}>
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
        <h1 class="text-5xl font-bold">Reset Your Password</h1>
        {/* <h2 class="text-3xl">
          Streamline your day with a personalized todo app designed for you.
        </h2> */}

        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Current Password:</span>
              </label>
              <input
                type="text"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                onFocus={(e) => {
                  setErrors([]);
                }}
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">New Password</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={(e) => {
                  setErrors([]);
                }}
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Confirm New Password</span>
              </label>
              <input
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                onFocus={(e) => {
                  setErrors([]);
                }}
              />
            </div>

            <div class="form-control mt-6">
              <button
                class={`btn btn-primary ${loading === true ? "loading" : " "}`}
                onClick={handlePasswordReset}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
