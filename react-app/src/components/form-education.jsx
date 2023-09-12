import { useRef, useState } from "react";
import { savedEducationData } from "../data/savedEducation";
import DateRange from "./date-range";

function Degree() {
  return (
    <>
      Degree *optional*
      <label htmlFor="degree">
        <input type="text" name="degree" id="degree" />
      </label>
    </>
  );
}

function School() {
  return (
    <>
      School / University *optional*
      <label htmlFor="school">
        <input type="text" name="school" id="school" />
      </label>
    </>
  );
}

export default function EducationComponent() {
  const [savedEducation, setSavedEducation] = useState(savedEducationData);

  const savedEduRef = useRef(null);
  const eduContainerRef = useRef(null);

  function SavedEducationList() {
    return (
      <>
        {savedEducation.map((education) => (
          <div key={education.id} className="saved-education">
            <p>
              <strong>{education.degree}</strong>, {education.school}
            </p>
            <p>
              {education.location} | {education.endDate.year}
            </p>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <h1>
        Education <span>*optional*</span>
      </h1>
      <div ref={savedEduRef}>
        <SavedEducationList />
      </div>
      <button
        onClick={() => {
          eduContainerRef.current.classList.toggle("hidden");
          savedEduRef.current.classList.toggle("hidden");
        }}
      >
        + New Education
      </button>

      <div ref={eduContainerRef} className="education-container hidden">
        <div>
          <School />
          <Degree />
          <DateRange />
        </div>
        <button className="education cancel-btn">Cancel</button>
        <button className="education save-btn">Save</button>
      </div>
    </>
  );
}
