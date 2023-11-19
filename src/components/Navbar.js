import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Logout } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { setShowAlert } from "../utils/store/appSlice";
const Navbar = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate =  useNavigate()
  const handleLogoutClick = () => {
    localStorage.removeItem("dashview-token");
    navigate("/login")
    dispatch(
      setShowAlert({
        type: true,
        message: "Logged Out Successffully",
      })
    );
    setTimeout(() => {
      dispatch(setShowAlert(null));
    }, 3000);
  };
  return (
    <div className="Navbar -mt-2">
      <header className="bg-blue-50 shadow-md shadow-blue-500">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 ">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="font-bold text-2xl">DashView</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            {localStorage.getItem("dashview-token") ? (
              <div
                onClick={handleLogoutClick}
                className="cursor-pointer hover:font-bold font-semibold leading-6 text-[#2a477f]"
              >
                <Logout sx={{ color: blue[600] }} />
                Logout
              </div>
            ) : pathname === "/login" ? (
              <Link
                to="/signup"
                className="hover:font-bold font-semibold leading-6 text-[#2a477f]"
              >
                Signup{" "}
                <span aria-hidden="true">
                  <LoginIcon />
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hover:font-bold font-semibold leading-6 text-[#2a477f]"
              >
                Log in{" "}
                <span aria-hidden="true">
                  <LoginIcon />
                </span>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
