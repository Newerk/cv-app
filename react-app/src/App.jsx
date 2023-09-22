import { useState } from "react";
import "./index.css";
import HeaderComponent from "./components/form-header.jsx";
import EducationComponent from "./components/form-education.jsx";
import ExperienceComponent from "./components/form-experience";
import CVPreview from "./components/cv-preview";
import SkillsComponent from "./components/form-skills";
import { savedExperiencesData } from "./data/savedExperiences";
import { savedEducationData } from "./data/savedEducation";

function App() {
  //general info component states
  const [inputValues, setInputValues] = useState({
    name: "Your Name",
    email: "email@example.com",
    phoneNum: "123-456-7890",
  });

  //education component states
  const [savedEducation, setSavedEducation] = useState(savedEducationData);
  const [eduPresentBoolean, setEduPresentBoolean] = useState(false);
  const [eduCurrentSelection, setEduCurrentSelection] = useState({
    current_id: "",
    is_editing: false,
  });

  const [educateStorage, setEducateStorage] = useState({
    beginMonth: "Month",
    beginYear: "Year",
    endMonth: "Month",
    endYear: "Year",
    present: eduPresentBoolean,
  });

  //experience component states
  const [savedExperiences, setSavedExperiences] =
    useState(savedExperiencesData);
  const [expPresentBoolean, setExpPresentBoolean] = useState(false);
  const [bulletpoint, setBulletPoint] = useState([]);
  const [expCurrentSelection, setExpCurrentSelection] = useState({
    current_id: "",
    is_editing: false,
  });

  const [expDateStorage, setExpDateStorage] = useState({
    beginMonth: "Month",
    beginYear: "Year",
    endMonth: "Month",
    endYear: "Year",
    present: expPresentBoolean,
  });

  //skills component states
  const [savedSkills, setSavedSkills] = useState([]);

  return (
    <>
      <div className="content">
        <div className="form-container">
          <HeaderComponent
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
          <EducationComponent
            savedEducation={savedEducation}
            setSavedEducation={setSavedEducation}
            presentBoolean={eduPresentBoolean}
            setPresentBoolean={setEduPresentBoolean}
            currentSelection={eduCurrentSelection}
            setCurrentSelection={setEduCurrentSelection}
            educateStorage={educateStorage}
            setEducateStorage={setEducateStorage}
          />
          <ExperienceComponent
            savedExperiences={savedExperiences}
            setSavedExperiences={setSavedExperiences}
            presentBoolean={expPresentBoolean}
            setPresentBoolean={setExpPresentBoolean}
            bulletpoint={bulletpoint}
            setBulletPoint={setBulletPoint}
            currentSelection={expCurrentSelection}
            setCurrentSelection={setExpCurrentSelection}
            expDateStorage={expDateStorage}
            setExpDateStorage={setExpDateStorage}
          />
          <SkillsComponent
            savedSkills={savedSkills}
            setSavedSkills={setSavedSkills}
          />
        </div>
        <div className="cv-container">
          <div id="cv-previewer">
            <CVPreview
              generalData={inputValues}
              eduData={savedEducation}
              // expData={}
              // skillsData={}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
