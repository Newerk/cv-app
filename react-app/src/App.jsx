/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./index.css";
import HeaderComponent from "./components/form-header.jsx";
import EducationComponent from "./components/form-education.jsx";
import ExperienceComponent from "./components/form-experience";
import CVPreview from "./components/cv-preview";
import SkillsComponent from "./components/form-skills";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  //general info component states
  const [inputValues, setInputValues] = useState({
    name: "Your Name",
    email: "email@example.com",
    phoneNum: "1234567890",
  });

  //education component states
  const [savedEducation, setSavedEducation] = useState([]);
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
    useState([]);
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

  const componentRef = useRef();

  const ExportToPdf = () => {
    const handleExport = () => {
      const input = document.getElementById("cv-previewer");

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save("resume.pdf");
      });
    };

    return (
      <div>
        <button id="download-btn" onClick={handleExport}>
          DOWNLOAD
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="content">
        <div className="form-container">
          <ExportToPdf />
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
          <div ref={componentRef} id="cv-previewer">
            <CVPreview
              generalData={inputValues}
              eduData={savedEducation}
              expData={savedExperiences}
              skillsData={savedSkills}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
