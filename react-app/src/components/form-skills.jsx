import { useRef, useState } from "react";

export default function SkillsComponent() {
  const [savedSkills, setSavedSkills] = useState("");
  const skillsRef = useRef(null);

  return (
    <div className="skills-section">
      <h1>Skills</h1>
      {savedSkills}
      <label htmlFor="">
        <textarea
          ref={skillsRef}
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Seperate each skill with a comma ','"
        ></textarea>
      </label>
      <button
        onClick={() => {
          setSavedSkills(skillsRef.current.value);
        }}
      >
        + Add Skills
      </button>
    </div>
  );
}
