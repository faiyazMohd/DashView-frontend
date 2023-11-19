import React, { useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import LineChart from "./LineChart";
import { accordionClasses } from "@mui/material";
const HorizontalBarChart = ({ data }) => {
  const chartRef = useRef();
  const [showLineChart, setShowLineChart] = useState(false);
  const [clickedBarEvent, setClickedBarEvent] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "10/4/2022",
    endDate: "10/29/2022",
    age: "all",
    gender: "both",
  });
  console.log(filters);
  // console.log(data);
  const [barChartConfig, setBarChartConfig] = useState({
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "features",
        data: [],
        backgroundColor: "#34a0a4",
      },
    ],
  });
  const formatDate = (inputDate) => {
    console.log(inputDate);
    const [day, month, year] = inputDate
      .split("/")
      .map((element) => Number(element));
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return inputDate;
    } else {
      const date = new Date(year, month - 1, day);
      // const formatedDay = date.getDate();
      const fullYear = date.getFullYear();
      // const formatedMonth = date.toLocaleString("en-US", {
      //   month: "short",
      // });

      const formattedDate = `${month}/${day}/${fullYear}`;
      return formattedDate;
    }
  };
  const isDateInRange = (givenDate, startDate, endDate) => {
    console.log(startDate);
    console.log(endDate);
    const givenDateTime = givenDate.getTime();
    const startDateTime = startDate.getTime();
    const endDateTime = endDate.getTime();
    console.log(startDateTime);
    console.log(givenDateTime);
    console.log(endDateTime);
    return givenDateTime >= startDateTime && givenDateTime <= endDateTime;
  };
  useEffect(() => {
    let labels = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    let datasets;
    if (
      filters.startDate === "10/4/2022" &&
      filters.endDate === "10/29/2022" &&
      filters.gender === "both" &&
      filters.age === "all"
    ) {
      
      datasets = data.reduce((acc, element) => {
        acc.A += +element.A;
        acc.B += +element.B;
        acc.C += +element.C;
        acc.D += +element.D;
        acc.E += +element.E;
        acc.F += +element.F;
        return acc;
      }, labels);
    } else {
      datasets = data.reduce((acc, element) => {
        console.log(accordionClasses);
        console.log(element.Day);
        let elementDate = new Date(formatDate(element.Day));
        console.log(formatDate(element.Day));
        console.log(elementDate);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        const result = isDateInRange(elementDate, startDate, endDate);
        console.log(result);
        console.log(element.Gender === filters.gender);
        console.log(element.Age === filters.age);
        if (
          element.Gender === filters.gender &&
          element.Age === filters.age &&
          result
        ) {
          acc.A += +element.A;
          acc.B += +element.B;
          acc.C += +element.C;
          acc.D += +element.D;
          acc.E += +element.E;
          acc.F += +element.F;
        }

        return acc;
      }, labels);
    }

    console.log(datasets);
    datasets = Array.from(Object.values(datasets));
    setBarChartConfig({
      labels: ["A", "B", "C", "D", "E", "F"],
      datasets: [
        {
          label: "features",
          data: datasets,
          backgroundColor: "#1e88e5",
        },
      ],
    });
  }, [filters]);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        // borderWidth: 2,
      },
    },
    animations: {
      duration: 1000,
      easing: "easeOutBounce",
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: 700,
          },
        },
      },
      tooltip: {
        backgroundColor: "#03045e",
      },
    },
  };
  const onClick = (event) => {
    const eventArr = getElementAtEvent(chartRef.current, event);
    if (eventArr.length > 0) {
      setShowLineChart(true);
      setClickedBarEvent(eventArr[0]);
      console.log(getElementAtEvent(chartRef.current, event));
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mt-4 ">
        <div className="flex flex-col items-center">
          <div className="flex gap-4 my-5">
            <div className="flex justify-center items-center flex-col font-semibold">
              <div className="text-lg">Select Gender</div>
              <select
                className="p-1.5 bg-purple-50 font-normal focus:outline-purple-700 border border-purple-700 shadow rounded-lg text-lg"
                defaultValue={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex justify-center items-center flex-col font-semibold">
              <div className="text-lg">Select Age</div>
              <select
                className="p-1.5 bg-purple-50 font-normal focus:outline-purple-700 border border-purple-700 shadow rounded-lg text-lg"
                defaultValue={filters.age}
                onChange={(e) =>
                  setFilters({ ...filters, age: e.target.value })
                }
              >
                <option value="15-25">15-25</option>
                <option value=">25">&gt;25</option>
              </select>
            </div>
          </div>
          {/* <div className=""> */}
          <div className="text-xl font-semibold mt-3">
            Select the Range of Date
          </div>
          <div className="flex gap-5">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
            <span className="text-3xl font-bold">-</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>
          {/* </div> */}
          {/* <DateRangeCalender setFilteredData={setFilteredData}/> */}
        </div>
        <Bar
          ref={chartRef}
          data={barChartConfig}
          onClick={onClick}
          options={options}
        />
      </div>
      {showLineChart ? (
        <LineChart
        data={data}
          setShowLineChart={setShowLineChart}
          clickedBarEvent={clickedBarEvent}
          filters={filters}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default HorizontalBarChart;
