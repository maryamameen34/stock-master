import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import server from "../../server";

const LoginForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${server}/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSuccess("Login Successfully!!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error: unknown | any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "534412529512196",
          cookie: true,
          xfbml: true,
          version: "v10.0",
        });
      };

      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadFacebookSDK();
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information.... ");
          window.FB.api("/me", (userResponse: any) => {
            console.log("Good to see you, " + userResponse.name + ".");
            // Handle successful login, e.g., redirect or store user info
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="">
      <div className="lg:w-[40%] md:w-[70%] w-[90%] mt-10 p-9 md:p-14 lg:p-10 border bg-[#fff] shadow-lg mx-auto mb-4">
        <div>
          <p className="text-center text-lg font-bold mt-7">
            Log in with Stock Master
          </p>
        </div>
        <div>
          <p className="text-center px-10 font-normal text-sm mt-4 mb-8">
            Continue with Email or Facebook or Google Account
          </p>
        </div>

        {error && (
          <p className="text-xs bg-red-100 mt-1 rounded-md mx-auto text-red-800 w-full text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs bg-green-100 mt-1 rounded-md mx-auto text-green-800 w-full text-center">
            {success}
          </p>
        )}
        <form action="" method="post" onSubmit={handleSubmit}>
          {step === 0 ? (
            <div>
              <div className="mt-8 ">
                <label htmlFor="" className="font-medium text-sm text-gray-900">
                  Email:
                </label>
                <input
                  className="w-full border-b mt-1 focus:outline-none text-sm py-1 rounded-sm"
                  type="email"
                  name="email"
                  value={email}
                  required
                  placeholder="Enter Email*"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-[50%] mx-auto py-2 mt-5 rounded-sm bg-indigo-700 hover:bg-indigo-600">
                <button
                  className="mx-auto text-white w-full font-medium"
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {step === 1 ? (
            <div>
              <div className="text-xs mt-8">
                <p>
                  Your Email Address is <button>{email}</button> or{" "}
                  <button
                    className="text-indigo-600"
                    onClick={() => {
                      setStep(step - 1);
                    }}
                  >
                    Change
                  </button>{" "}
                  it.
                </p>
              </div>
              <div className="mt-5">
                <label htmlFor="" className="font-medium text-sm text-gray-900">
                  Password:
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full border-b mt-1 focus:outline-none text-sm py-1 rounded-sm"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    placeholder="Enter Password*"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0 mr-2 text-xs text-indigo-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="text-right">
                  <Link
                    to={"/forgot-password"}
                    className=" text-sm mt-1 text-indigo-600 cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="w-[50%] mx-auto py-2 mt-5 rounded-sm bg-indigo-700 hover:bg-indigo-600">
                <button className="mx-auto text-white w-full font-medium">
                  Login
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
        <div className="flex items-center mt-5 ">
          <p className="text-sm">Don't have an Account?</p>
          <Link to={"/sign-up"} className="text-sm ml-1 text-indigo-700">
            Register Now
          </Link>
        </div>

        <div className="flex items-center lg:px-5 justify-between mt-3">
          <div className="bg-gray-400 h-[1px] mt-1 w-[50%]"></div>
          <div className="text-center text-gray-500 mx-2 font-medium opacity-85">
            or
          </div>
          <div className="h-[1px] bg-gray-400 mt-1 w-[50%]"></div>
        </div>
        <div className="w-[100%] mx-auto py-2 mt-5 border-2 hover:bg-[#f1f1f1] border-neutral-800 rounded-full">
          <button className="mx-auto text-neutral-800 w-full font-medium">
            Continue with Google
          </button>
        </div>
        <div className="w-[100%] mx-auto py-2 mt-5 border-2 hover:bg-[#f1f1f1] border-neutral-800 rounded-full">
          <button
            onClick={handleFBLogin}
            className="mx-auto text-black w-full font-medium"
          >
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
