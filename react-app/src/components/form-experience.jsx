import { useRef, useState } from "react";
import DateRange, { yearStorage } from "./date-range";
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

export default function ExperienceComponent() {
  const [savedExperiences, setSavedExperiences] =
    useState(savedExperiencesData);

  const [bulletpoint, setBulletPoint] = useState([]);

  const [expYearStorage, setExpYearStorage] = useState({
    beginYear: "",
    endYear: "",
  });

  const expContainerRef = useRef(null);
  const addExpBtnRef = useRef(null);
  const savedExpRef = useRef(null);

  function formReset() {
    //clear text from inputs
    document.getElementById("position").value = "";
    document.getElementById("company").value = "";
    expContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".year-btn").textContent = "Year";

    expContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".year-btn").textContent = "Year";

    setBulletPoint([]);
  }

  const toggleFormVisiblity = () => {
    expContainerRef.current.classList.toggle("hidden");
    addExpBtnRef.current.classList.toggle("hidden");
    savedExpRef.current.classList.toggle("hidden");
  };

  const handleSaveExperience = () => {
    setSavedExperiences([
      ...savedExperiences,
      {
        id: uuidv4(),
        position: document.getElementById("position").value,
        employer: document.getElementById("company").value,
        beginDate: yearStorage.beginYear,
        endDate: yearStorage.endYear,
        bulletPoints: [...bulletpoint], //need to take bulletpoints and copy it here
      },
    ]);

    formReset();
  };

  function Bulletpoints() {
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
    );
  }

  function SavedExperiences() {
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

  return (
    <div className="experience-section">
      <h1>Experience</h1>

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
          <DateRange
            parentRef={expContainerRef}
            yearStorage={expYearStorage}
            yearStorageSetter={setExpYearStorage}
          />
          <Bulletpoints />
        </div>
        <button
          className="experience cancel-btn"
          onClick={() => {
            toggleFormVisiblity();
            formReset();
          }}
        >
          Cancel
        </button>
        <button
          className="experience save-btn"
          onClick={() => {
            toggleFormVisiblity();
            handleSaveExperience();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
