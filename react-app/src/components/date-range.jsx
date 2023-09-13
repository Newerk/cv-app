/* eslint-disable react/prop-types */
//make sure to give the option for the user to select 'Present' if they are still currently involved

import { useRef, useState } from "react";
import { monthsList } from "../data/monthsArray";
import "../date-range.css";

//Elements with "focused" toggle will be the element of focus to have its text content change based on the user selection

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

//perhaps pass a prop so that DateRange can handle itself based on the component it is used inside of so that nothing has to be hard coded
/*Areas that need to be refactored once I add a prop:
1. dateStorage
2. the two if statements in my Present Checkbox Input Elements
 */
export default function DateRange({
  parentRef,
  dateStorage,
  dateStorageSetter,
}) {
  const [beginMonth, setBeginMonth] = useState("Month");
  const [beginYear, setBeginYear] = useState("Year");

  const [endMonth, setEndMonth] = useState("Month");
  const [endYear, setEndYear] = useState("Year");

  const monthSelectRef = useRef(null);
  const yearSelectRef = useRef(null);

  const beginInputsRef = useRef(null);
  const endInputsRef = useRef(null);

  const handleMonthSelection = (e) => {
    if (
      beginInputsRef.current
        .querySelector(".month-btn")
        .classList.contains("focused")
    ) {
      setBeginMonth(e.target.textContent);
      dateStorageSetter({ ...dateStorage, beginMonth: e.target.textContent });
    } else {
      setEndMonth(e.target.textContent);
      dateStorageSetter({ ...dateStorage, endMonth: e.target.textContent });
    }

    monthSelectRef.current.classList.toggle("hidden");
  };

  const handleYearSelection = (e) => {
    if (
      beginInputsRef.current
        .querySelector(".year-btn")
        .classList.contains("focused")
    ) {
      setBeginYear(e.target.textContent);
      dateStorageSetter({ ...dateStorage, beginYear: e.target.textContent });
    } else {
      setEndYear(e.target.textContent);
      dateStorageSetter({ ...dateStorage, endYear: e.target.textContent });
    }

    yearSelectRef.current.classList.toggle("hidden");
  };

  const clearFocusedElements = () => {
    beginInputsRef.current
      .querySelector(".month-btn")
      .classList.remove("focused");
    beginInputsRef.current
      .querySelector(".year-btn")
      .classList.remove("focused");
    endInputsRef.current
      .querySelector(".month-btn")
      .classList.remove("focused");
    endInputsRef.current.querySelector(".year-btn").classList.remove("focused");
  };

  return (
    <div className="date-range-component">
      <div className="begin-date-inputs" ref={beginInputsRef}>
        Start Date
        <div className="buttons-wrapper">
          <button
            className="month-btn"
            onClick={(e) => {
              monthSelectRef.current.classList.toggle("hidden");
              yearSelectRef.current.classList.add("hidden");

              clearFocusedElements();

              e.target.parentElement
                .querySelector(".month-btn")
                .classList.toggle("focused");
            }}
          >
            {beginMonth}
          </button>
          <button
            className="year-btn"
            onClick={(e) => {
              yearSelectRef.current.classList.toggle("hidden");
              monthSelectRef.current.classList.add("hidden");

              clearFocusedElements();

              e.target.parentElement
                .querySelector(".year-btn")
                .classList.toggle("focused");
            }}
          >
            {beginYear}
          </button>
        </div>
      </div>
      <div className="end-date-inputs" ref={endInputsRef}>
        End Date
        <div className="buttons-wrapper">
          <button
            className="month-btn"
            onClick={(e) => {
              monthSelectRef.current.classList.toggle("hidden");
              yearSelectRef.current.classList.add("hidden");

              clearFocusedElements();

              e.target.parentElement
                .querySelector(".month-btn")
                .classList.toggle("focused");
            }}
          >
            {endMonth}
          </button>
          <button
            className="year-btn"
            onClick={(e) => {
              yearSelectRef.current.classList.toggle("hidden");
              monthSelectRef.current.classList.add("hidden");

              clearFocusedElements();

              e.target.parentElement
                .querySelector(".year-btn")
                .classList.toggle("focused");
            }}
          >
            {endYear}
          </button>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="present"
            id="present-cb"
            onChange={(e) => {
              endInputsRef.current
                .querySelector(".buttons-wrapper")
                .classList.toggle("hidden");

              yearSelectRef.current.classList.add("hidden");
              monthSelectRef.current.classList.add("hidden");

              if (e.target.checked) {
                dateStorage.endYear = "Present";
                if (
                  parentRef.current.classList.contains("education-container")
                ) {
                  //do something
                  parentRef.current.style.backgroundColor = "red";
                }
                if (
                  parentRef.current.classList.contains("experience-container")
                ) {
                  //do something
                }
              } else {
                dateStorage.endYear = "";
              }
            }}
          />
          <label htmlFor="present-cb">Present</label>
        </div>
      </div>
      <div ref={monthSelectRef} className="months-dropdown hidden">
        <MonthSelection data={monthsList} handler={handleMonthSelection} />
      </div>
      <div ref={yearSelectRef} className="years-dropdown hidden">
        <YearSelection handler={handleYearSelection} />
      </div>
    </div>
  );
}
