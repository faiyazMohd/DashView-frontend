import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowAlert } from "../utils/store/appSlice";
import { setData } from "../utils/store/dataSlice";
import HorizontalBarChart from "../components/HorizontalBarChart";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const DashbaordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.data.data);
  useEffect(() => {
    if (localStorage.getItem("dashview-token")) {
      getData();
    } else {
      navigate("/login");
      dispatch(
        setShowAlert({
          type: true,
          message: "Please Login to continue DashView",
        })
      );
      setTimeout(() => {
        dispatch(setShowAlert(null));
      }, 3000);
    }
  }, []);
  const getData = async () => {
    const authToken = localStorage.getItem("dashview-token");
    const responseData = await fetch(`${BASE_URL}/api/getData`, {
      method: "GET",
      headers: {
        "auth-token": authToken,
        "Content-Type": "application/json",
      },
    });
    const json = await responseData.json();
    // console.log(json);
    if (json.success) {
      dispatch(setData(json.data));
    }
  };
  return (
    <div className="bodyContainer w-full max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] m-auto">
      {/* <h1 className="text-3xl font-bold underline">Dashboard</h1> */}
      {data ? <HorizontalBarChart data={data} /> : ""}
    </div>
  );
};

export default DashbaordPage;
