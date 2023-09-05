import { useRef, useState } from "react";
import { bulletPointsData } from "../data/bulletpoints";
import DateRange from "./date-range";
import { v4 as uuidv4 } from "uuid";
import { savedExperiencesData } from "../data/savedExperiences";

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

function Bulletpoints() {
  const [bulletpoint, setBulletPoint] = useState(bulletPointsData);

  const handleAddingBullet = () => {
    let textAreaValue = document.getElementById("new-bullet").value;
    setBulletPoint([...bulletpoint, { id: uuidv4(), info: textAreaValue }]);
    document.getElementById("new-bullet").value = "";
  };

  return (
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
                  setBulletPoint(bulletpoint.filter((li) => li.id !== point.id))
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
  );
}

function SavedExperiences() {
  const [savedExperiences, setSavedExperiences] =
    useState(savedExperiencesData);

  return (
    <>
      {savedExperiences.map((experience) => (
        <div key={experience.id} className="saved-experience">
          <p>
            <strong>{experience.position}</strong>, {experience.employer}
          </p>
          <p>
            {experience.beginDate}-{experience.endDate}
          </p>
        </div>
      ))}
    </>
  );
}

export default function ExperienceComponent() {
  const expContainerRef = useRef(null);
  const addExpBtnRef = useRef(null);
  const savedExpRef = useRef(null);

  const toggleFormVisiblity = () => {
    expContainerRef.current.classList.toggle("hidden");
    addExpBtnRef.current.classList.toggle("hidden");
    savedExpRef.current.classList.toggle("hidden");
  };

  return (
    <>
      <h1>Experience</h1>

      {/* 
      <SavedExperiences /> renders an array of saved experiences, with condensed info
      <SavedExperiences /> can be clicked on to be edited
      <SavedExperiences /> should be hidden while working on a new experience form
      */}

      <div ref={savedExpRef}>
        <SavedExperiences />
      </div>

      <button
        ref={addExpBtnRef}
        onClick={(e) => {
          e.target.classList.toggle("hidden");
          expContainerRef.current.classList.toggle("hidden");
          savedExpRef.current.classList.toggle("hidden");
        }}
      >
        + New Experience
      </button>
      <div ref={expContainerRef} className="experience-container hidden">
        <div>
          <JobTitle />
          <Company />
          <DateRange />
          <Bulletpoints />
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
