import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import server from "../../server";

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", fname);
    formData.append("last_name", lname);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("file", image);
    }
    formData.append("confirm_password", cpassword);

    try {
      const response = await axios.post(`${server}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      setSuccess("User registered. Check your email for verification.");
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setCpassword("");
      setImage(null);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="">
      <div className="lg:w-[40%] md:w-[70%] w-[90%] mt-10 p-9 md:p-14 lg:p-10 border bg-[#fff] shadow-lg mx-auto mb-4">
        <div>
          <p className="text-center text-lg font-bold mt-7">
            SignUp with Stock Master
          </p>
        </div>
        <div>
          <p className="text-center px-10 mb-5 font-normal text-sm mt-4">
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

        <div className="relative flex justify-center items-end mb-5 mt-6">
          <div>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-16 h-16 object-cover border border-gray-300 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500">
                <img src="/user.gif" alt="" className="rounded-full" />
              </div>
            )}
          </div>
          <div className="absolute ml-12 mb-1">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <FaCamera size="0.875rem" color="gray" />
            </label>
            <input
              type="file"
              name="imageUpload"
              id="imageUpload"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <form method="post" onSubmit={handleSubmit}>
          {step === 0 ? (
            <div>
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor=""
                    className="font-medium text-sm text-gray-900"
                  >
                    First Name:
                  </label>
                  <input
                    className="w-full border-b focus:outline-none text-sm py-1 rounded-sm"
                    type="text"
                    name="fname"
                    value={fname}
                    placeholder="Enter First Name*"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor=""
                    className="font-medium text-sm text-gray-900"
                  >
                    Last Name:
                  </label>
                  <input
                    className="w-full border-b focus:outline-none text-sm py-1 rounded-sm"
                    type="text"
                    name="lname"
                    value={lname}
                    placeholder="Enter Last Name*"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3 ">
                <label htmlFor="" className="font-medium text-sm text-gray-900">
                  Email:
                </label>
                <input
                  className="w-full border-b focus:outline-none text-sm py-1 rounded-sm"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email*"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="justify-end text-end my-5 ">
                <Link
                  to={"/sign-up/customer"}
                  className="text-sm text-indigo-700"
                >
                  Join as Customer
                </Link>
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
          {step === 1 && (
            <div>
              <div className="text-xs mt-8">
                <p>
                  Your {"Email Address"} is <button>{email || ""}</button> or{" "}
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
              </div>
              <div className="mt-5">
                <label htmlFor="" className="font-medium text-sm text-gray-900">
                  Confirm Password:
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full border-b mt-1 focus:outline-none text-sm py-1 rounded-sm"
                    type={showConfirmPassword ? "text" : "password"}
                    name="cpassword"
                    value={cpassword}
                    placeholder="Enter Confirm Password*"
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-0  mr-2 text-xs text-indigo-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="w-[50%] mx-auto py-2 mt-5 rounded-sm bg-indigo-700 hover:bg-indigo-600">
                <button
                  className="mx-auto text-white w-full font-medium"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="flex justify-center items-center gap-1 mt-5">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
