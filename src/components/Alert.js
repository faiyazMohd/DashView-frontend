import React from "react";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSelector } from "react-redux";

export default function Alert() {
  const showAlert = useSelector((store) => store.app.showAlert);

  return (
    <div className="">
      <div
        className={`ml-2 absolute top-20 rounded-2xl  m-auto w-[90%] sm:w-[65%] md:w-[32%] ${
          showAlert ? "shadow-[2px_7px_16px_3px_#68d391]" : ""
        }`}
      >
        {showAlert && (
          <MuiAlert
            severity={showAlert.type}
            sx={{
              background: `${
                showAlert.type === "error"
                  ? "linear-gradient(90deg, rgba(249,203,199,1) 0%, rgba(244,137,144,1) 59%, rgba(253,145,127,1) 100%)"
                  : "linear-gradient(90deg, rgba(222,249,199,1) 0%, rgba(141,227,172,1) 64%, rgba(170,253,127,1) 100%)"
              }`,
              borderRadius: "1rem",
            }}
          >
            <AlertTitle>
              <b className="capitalize">{showAlert?.type}</b>
            </AlertTitle>
            <strong>{showAlert.message}!</strong>
          </MuiAlert>
        )}
      </div>
    </div>
  );
}