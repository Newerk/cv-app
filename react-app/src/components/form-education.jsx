import { useState } from "react";
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
      <SavedEducationList />
      <button>+ New Education</button>
      <div>
        <School />
        <Degree />
        <DateRange />
      </div>
    </>
  );
}
