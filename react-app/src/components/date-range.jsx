//make sure to give the option for the user to select 'Present' if they are still currently involved

import { useRef, useState } from "react";

function MonthSelection({ data, handler }) {
  return (
    <div className="months-container">
      {data.map((month) => (
        <button key={month.numerical} onClick={handler}>
          {month.month}
        </button>
      ))}
    </div>
  );
}

function YearSelection({ handler }) {
  let years = [];

  let currentYear = new Date().getFullYear();

  for (let index = currentYear; index >= 1945; index--) {
    years.push(index);
  }

  return (
    <div className="years-container">
      {years.map((year) => (
        <button key={year} onClick={handler}>
          {year}
        </button>
      ))}
    </div>
  );
}

export default function DateRange() {
  const [beginMonth, setBeginMonth] = useState("Month");
  const [beginYear, setBeginYear] = useState("Year");

  const [endMonth, setEndMonth] = useState("Month");
  const [endYear, setEndYear] = useState("Year");

  const monthSelectRef = useRef(null);
  const yearSelectRef = useRef(null);

  const monthsList = [
    { month: "January", numerical: "01", selected: false },
    { month: "Febuary", numerical: "02", selected: false },
    { month: "March", numerical: "03", selected: false },
    { month: "April", numerical: "04", selected: false },
    { month: "May", numerical: "05", selected: false },
    { month: "June", numerical: "06", selected: false },
    { month: "July", numerical: "07", selected: false },
    { month: "August", numerical: "08", selected: false },
    { month: "September", numerical: "09", selected: false },
    { month: "October", numerical: "10", selected: false },
    { month: "November", numerical: "11", selected: false },
    { month: "December", numerical: "12", selected: false },
  ];

  const handleMonthSelection = () => {
    setBeginMonth("TEST");
    monthSelectRef.current.classList.toggle("hidden");
  };

  const handleYearSelection = () => {
    setBeginYear("TEST");
    yearSelectRef.current.classList.toggle("hidden");
  };

  return (
    <>
      <div className="begin-date-inputs">
        <button
          onClick={() => monthSelectRef.current.classList.toggle("hidden")}
        >
          {beginMonth}
        </button>
        <button
          onClick={() => yearSelectRef.current.classList.toggle("hidden")}
        >
          {beginYear}
        </button>

        <div ref={monthSelectRef} className="months-dropdown hidden">
          <MonthSelection data={monthsList} handler={handleMonthSelection} />
        </div>
        <div ref={yearSelectRef} className="years-dropdown hidden">
          <YearSelection handler={handleYearSelection} />
        </div>
      </div>

      <div className="end-date-inputs">
        <div>
          <button>{endMonth}</button>
          <button>{endYear}</button>
        </div>
        <div>
          <input type="checkbox" name="present" id="present-cb" />
          <label htmlFor="present-cb">Present</label>
        </div>
      </div>
    </>
  );
}
