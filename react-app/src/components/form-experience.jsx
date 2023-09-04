import { useRef, useState } from "react";
import { bulletPointsData } from "../data/bulletpoints";
import DateRange from "./date-range";
import { v4 as uuidv4 } from "uuid";

function Company() {
  return (
    <>
      Employer
      <label htmlFor="company">
        <input type="text" name="company" id="company" />
      </label>
    </>
  );
}

function JobTitle() {
  return (
    <>
      Job Title
      <label htmlFor="position">
        <input type="text" name="job title" id="position" />
      </label>
    </>
  );
}

function SaveAndCancelBtns() {
  return (
    <>
      <button
        className="bullet save-btn hidden"
        onClick={(e) => {
          //save btn
          e.target.classList.toggle("hidden");

          //cancel btn
          e.target.nextElementSibling.classList.toggle("hidden");

          //delete btn
          e.target.previousElementSibling.classList.toggle("hidden");

          //edit btn
          e.target.previousElementSibling.previousElementSibling.classList.toggle(
            "hidden"
          );
        }}
      >
        Save
      </button>
      <button
        className="bullet cancel-btn hidden"
        onClick={(e) => {
          //cancel btn
          e.target.classList.toggle("hidden");

          //save btn
          e.target.previousElementSibling.classList.toggle("hidden");

          //delete btn
          e.target.previousElementSibling.previousElementSibling.classList.toggle(
            "hidden"
          );

          //edit btn
          e.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.toggle(
            "hidden"
          );
        }}
      >
        Cancel
      </button>
    </>
  );
}

export default function ExperienceComponent() {
  const [bulletpoint, setBulletPoint] = useState(bulletPointsData);
  const expContainerRef = useRef(null);
  const addExpBtnRef = useRef(null);

  const handleAddingBullet = () => {
    let textAreaValue = document.getElementById("new-bullet").value;
    setBulletPoint([...bulletpoint, { id: uuidv4(), info: textAreaValue }]);
    document.getElementById("new-bullet").value = "";
  };

  //   const handleEditingBullet = () => {
  // //code to handle making the text in the bulletpoint editable
  //   };

  const toggleFormVisiblity = () => {
    expContainerRef.current.classList.toggle("hidden");
    addExpBtnRef.current.classList.toggle("hidden");
  };

  return (
    <>
      <h1>Experience</h1>

      <button
        ref={addExpBtnRef}
        onClick={(e) => {
          e.target.classList.toggle("hidden");
          expContainerRef.current.classList.toggle("hidden");
        }}
      >
        + New Experience
        {/*the experience container below is only visible for code writing purposes. Later on it will only 
          appear when the New Experience button is clicked*/}
      </button>
      <div ref={expContainerRef} className="experience-container hidden">
        <div>
          <JobTitle />
          <Company />
          <DateRange />
        </div>
        <div className="bullets-wrapper">
          {
            <ul>
              {bulletpoint.map((point) => (
                <li key={point.id}>
                  <p>{point.info}</p>
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      //edit btn
                      e.target.classList.toggle("hidden");

                      //delete btn
                      e.target.nextElementSibling.classList.toggle("hidden");

                      //save btn
                      e.target.nextElementSibling.nextElementSibling.classList.toggle(
                        "hidden"
                      );

                      //cancel btn
                      e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle(
                        "hidden"
                      );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      setBulletPoint(
                        bulletpoint.filter((li) => li.id !== point.id)
                      )
                    }
                  >
                    Delete
                  </button>
                  <SaveAndCancelBtns />
                </li>
              ))}
            </ul>
          }
          <textarea name="new-bullet" id="new-bullet"></textarea>
          <button onClick={handleAddingBullet}>Add Bulletpoint</button>
        </div>
        <button className="experience cancel-btn" onClick={toggleFormVisiblity}>
          Cancel
        </button>
        <button className="experience save-btn" onClick={toggleFormVisiblity}>
          Save
        </button>
      </div>
    </>
  );
}
