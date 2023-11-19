import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailValidator from "email-validator";
import { useDispatch } from "react-redux";
import { setShowAlert } from "../utils/store/appSlice";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const SignUpPage = () => {
  document.title = "DashView - SignUp";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [color, setColor] = useState("#1a2b4b");
  const [signupCred, setSignupCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleOnChange = (event) => {
    setSignupCred({ ...signupCred, [event.target.name]: event.target.value });
  };
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (
      signupCred.email.length > 0 &&
      signupCred.name.length > 0 &&
      signupCred.password.length > 0 &&
      signupCred.cpassword.length > 0
    ) {
      if (signupCred.password === signupCred.cpassword) {
        const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signupCred.name,
            email: signupCred.email,
            password: signupCred.password,
          }),
        });
        const json = await response.json();
        if (json.success) {
          // Save the auth token and redirect
          localStorage.setItem("dashview-token", json.authToken);

          navigate("/");
          setSignupCred({
            name: "",
            email: "",
            password: "",
            cpassword: "",
          });
        }
        dispatch(
          setShowAlert({
            type: json.success,
            message: json.msg,
          })
        );
        setTimeout(() => {
          dispatch(setShowAlert(null));
        }, 3000);
      } else {
        dispatch(
          setShowAlert({
            type: false,
            message: "Password and Confirm Password does not match",
          })
        );
        setTimeout(() => {
          dispatch(setShowAlert(null));
        }, 3000);
      }
    } else {
      setColor("#b0271a");
      dispatch(
        setShowAlert({
          type: false,
          message: "Fill out all the details",
        })
      );
      setTimeout(() => {
        dispatch(setShowAlert(null));
      }, 3000);
    }
  };
  return (
    <div className=" min-h-[90vh]">
      <div className="Login-Container mb-8 container rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] text-[#1a2b4b] mt-4 flex justify-center items-center w-[95%] md:w-[55%] m-auto">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 className="block pt-5 font-sans text-4xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Signup To DashView
          </h4>
          <p className="mt-4 text-xl block font-sans font-normal leading-relaxed text-gray-700 antialiased">
            Enter your details to signup.
          </p>
          <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-[#1a2b4b]  border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#1a2b4b]  placeholder-shown:border-t-[#1a2b4b]  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeHolder=" "
                  name="name"
                  value={signupCred.name}
                  onChange={handleOnChange}
                  required
                  minLength={3}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-semibold leading-tight text-[#1a2b4b]  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#1a2b4b]  before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#1a2b4b]  after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-[#1a2b4b]  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#1a2b4b] ">
                  Name
                </label>
              </div>
              <label
                htmlFor="name"
                className={`text-xs -mt-6 ${
                  color === "#1a2b4b" ? "text-[#1a2b4b]" : "text-red-600"
                } ${signupCred.name.length < 3 ? "" : "hidden"}`}
              >
                name must be atlest 3 letters long
              </label>

              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-[#1a2b4b]  border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#1a2b4b]  placeholder-shown:border-t-[#1a2b4b]  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeHolder=" "
                  name="email"
                  value={signupCred.email}
                  onChange={handleOnChange}
                  required
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-semibold leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#1a2b4b]  before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#1a2b4b]  after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-[#1a2b4b]  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#1a2b4b] ">
                  Email
                </label>
              </div>
              <label
                htmlFor="email"
                className={`text-xs -mt-6 ${
                  color === "#1a2b4b" ? "text-[#1a2b4b]" : "text-red-600"
                } ${EmailValidator.validate(signupCred.email) ? "hidden" : ""}`}
              >
                enter a valid email
              </label>

              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border border-[#1a2b4b]  border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#1a2b4b]  placeholder-shown:border-t-[#1a2b4b]  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeHolder=" "
                  name="password"
                  value={signupCred.password}
                  onChange={handleOnChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-semibold leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#1a2b4b]  before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#1a2b4b]  after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-[#1a2b4b]  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#1a2b4b] ">
                  Password
                </label>
              </div>
              <label
                htmlFor="password"
                className={`text-xs -mt-6 ${
                  color === "#1a2b4b" ? "text-[#1a2b4b]" : "text-red-600"
                } ${signupCred.password.length < 4 ? "" : "hidden"}`}
              >
                length for the password must be atleast 4{" "}
              </label>

              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border border-[#1a2b4b]  border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#1a2b4b]  placeholder-shown:border-t-[#1a2b4b]  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeHolder=" "
                  name="cpassword"
                  value={signupCred.cpassword}
                  onChange={handleOnChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-semibold leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#1a2b4b]  before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#1a2b4b]  after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-[#1a2b4b]  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#1a2b4b] ">
                  Confirm Password
                </label>
              </div>
              <label
                htmlFor="cpassword"
                className={`text-xs -mt-6 ${
                  color === "#1a2b4b" ? "text-[#1a2b4b]" : "text-red-600"
                } ${
                  signupCred.cpassword === signupCred.password ? "hidden" : ""
                }`}
              >
                both the passwords must match
              </label>
            </div>

            <button
              className="mt-6 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={handleSignupSubmit}
              // disabled
            >
              Register
            </button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-[#1a2b4b] antialiased">
              Already have an account?
              <Link
                className="font-medium hover:font-semibold ml-3 text-blue-500 transition-colors hover:text-blue-700"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
