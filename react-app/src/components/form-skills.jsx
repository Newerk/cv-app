/* eslint-disable react/prop-types */
import { useRef } from "react";

export default function SkillsComponent({ savedSkills, setSavedSkills }) {
  const skillsRef = useRef(null);
  const skillsContainerRef = useRef(null);
  const addSkillBtnRef = useRef(null);
  const skillsSectionRef = useRef();

  return (
    <div ref={skillsSectionRef} className="skills-section">
      <h1>Skills</h1>
      <p>{savedSkills.join(", ")}</p>
      <button
        ref={addSkillBtnRef}
        onClick={(e) => {
          skillsContainerRef.current.classList.toggle("hidden");
          e.target.classList.toggle("hidden");
          skillsSectionRef.current.scrollIntoView({
            alignToTop: true,
            behavior: "smooth",
          });
        }}
      >
        + Add Skills
      </button>

      <div ref={skillsContainerRef} className="skills-container hidden">
        <label htmlFor="skills-textbox">
          <textarea
            ref={skillsRef}
            name="skills-textbox"
            id="skills-textbox"
            cols="30"
            rows="5"
            placeholder="Seperate each skill with a comma ','"
          ></textarea>
        </label>
        <button
          className="skills cancel-btn"
          onClick={() => {
            skillsRef.current.value = savedSkills.join(", ");
            skillsContainerRef.current.classList.toggle("hidden");
            addSkillBtnRef.current.classList.toggle("hidden");
          }}
        >
          Cancel
        </button>
        <button
          className="skills save-btn"
          onClick={() => {
            setSavedSkills(skillsRef.current.value);
            skillsContainerRef.current.classList.toggle("hidden");
            addSkillBtnRef.current.classList.toggle("hidden");

            let skillsArray = [];
            skillsRef.current.value
              .split(",")
              .forEach((skill) => skillsArray.push(skill.trim()));

            setSavedSkills([...skillsArray]);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
