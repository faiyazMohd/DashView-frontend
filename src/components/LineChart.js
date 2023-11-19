import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const LineChart = ({ data, setShowLineChart, clickedBarEvent, filters }) => {
  let features = ["A", "B", "C", "D", "E", "F"];
  console.log(clickedBarEvent);

  const [lineChartConfig, setLineChartConfig] = useState({
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "features",
        data: [],
        backgroundColor: "#5B0890",
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
      const fullYear = date.getFullYear();

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
    console.log(givenDateTime >= startDateTime && givenDateTime <= endDateTime);
    return givenDateTime >= startDateTime && givenDateTime <= endDateTime;
  };
  useEffect(() => {
    let datasets = [];
    let labels;

    labels = data.reduce((acc, element) => {
      console.log(element.Day);
      let elementDate = new Date(formatDate(element.Day));
      console.log(formatDate(element.Day));
      console.log(elementDate);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      const result = isDateInRange(elementDate, startDate, endDate);
      console.log(result);
      if (result) {
        acc.add(element.Day);
      }
      return acc;
    }, new Set([]));

    console.log(Array.from(labels));
    console.log(labels);
    if (labels.size !== 0) {
      const labelsObj = Object.assign(
        ...Array.from(labels, (value) => ({ [value]: 0 }))
      );
      console.log(labelsObj);
      if (
        filters.startDate === "10/4/2022" &&
        filters.endDate === "10/29/2022" &&
        filters.gender === "both" &&
        filters.age === "all"
      ) {
        datasets = data.reduce(
          (acc, element) => {
            if (acc[element.Day] !== undefined) {
              acc[element.Day] =
                +acc[element.Day] + +element[features[clickedBarEvent.index]];
            }
            return acc;
          },
          { ...labelsObj }
        );
      } else {
        datasets = data.reduce((acc, element) => {
          console.log(element.Day);
          let elementDate = new Date(formatDate(element.Day));
          console.log(formatDate(element.Day));
          console.log(elementDate);
          const startDate = new Date(filters.startDate);
          const endDate = new Date(filters.endDate);
          const result = isDateInRange(elementDate, startDate, endDate);

          if (
            element.Gender === filters.gender ||
            element.Age === filters.age ||
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
        datasets = data.reduce(
          (acc, element) => {
            console.log(element.Day);
            let elementDate = new Date(formatDate(element.Day));
            console.log(formatDate(element.Day));
            console.log(elementDate);
            const startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            const result = isDateInRange(elementDate, startDate, endDate);
            console.log(result);
            if (
              element.Gender === filters.gender ||
              element.Age === filters.age ||
              result
            ) {
              if (acc[element.Day] !== undefined) {
                acc[element.Day] =
                  +acc[element.Day] + +element[features[clickedBarEvent.index]];
              }
            }
            return acc;
          },
          { ...labelsObj }
        );
      }
    }

    console.log(datasets);
    datasets = Array.from(Object.values(datasets));
    setLineChartConfig({
      labels: Array.from(labels).map((element) => {
        const [day, month, year] = element
          .split("/")
          .map((element) => Number(element));
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
          return element;
        } else {
          const date = new Date(year, month - 1, day);
          const formatedDay = date.getDate();
          const formatedMonth = date.toLocaleString("en-US", {
            month: "short",
          });

          const formattedDate = `${formatedDay}-${formatedMonth}`;
          return formattedDate;
        }
      }),
      datasets: [
        {
          label: "features",
          data: datasets,
          backgroundColor: "#1e88e5",
        },
      ],
    });
  }, []);

  const options = {
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
  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.6)]"
        onClick={() => setShowLineChart(false)}
      ></div>
      <div
        className={`w-full sm:w-[576px] md:w-[696px] h-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2    rounded-xl backdrop-blur  shadow-[0px_4px_32px_0px_#0000001a] 
    bg-white text-black z-40`}
      >
        <div className="innerContainer w-[90%] m-auto">
          <div className="w-full mt-6 mb-1 flex justify-between ">
            <div className="text-lg">
              Line Chart for the feature - {features[clickedBarEvent.index]}
            </div>
            <div
              onClick={() => setShowLineChart(false)}
              className="cursor-pointer"
            >
              <CloseIcon />
            </div>
          </div>
          <div className="w-full mt-8">
            <Line data={lineChartConfig} options={options} />
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default LineChart;
