/* eslint-disable react/prop-types */
import { useRef /*, useState */ } from "react";
import DateRange from "./date-range";
import { v4 as uuidv4 } from "uuid";
// import { savedExperiencesData } from "../data/savedExperiences";

function Company() {
  return (
    <>
      Employer
      <label htmlFor="employer">
        <input type="text" name="employer" id="employer" />
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

function Location() {
  return (
    <>
      Location
      <label htmlFor="exp-location">
        <input type="text" name="location" id="exp-location" />
      </label>
    </>
  );
}

function SaveAndCancelBtns({ bullet }) {
  let originalBulletInfo = bullet.info;

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

          e.target.parentElement.firstChild.classList.toggle("editing-bullet");
          e.target.parentElement.firstChild.contentEditable = false;
          originalBulletInfo = bullet.info =
            e.target.parentElement.firstChild.textContent;
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

          e.target.parentElement.firstChild.classList.toggle("editing-bullet");
          e.target.parentElement.firstChild.contentEditable = false;
          e.target.parentElement.firstChild.textContent = originalBulletInfo;
        }}
      >
        Cancel
      </button>
    </>
  );
}

function SavedExperiences({ data, handler, reference }) {
  return (
    <>
      {data.map((experience) => (
        <div
          key={experience.id}
          className="saved-experience"
          onClick={() => {
            handler(experience.id);

            //If selected div has a "present" end date, then make sure the end-year & end-month buttons are hidden
            if (experience.endDate.present === true) {
              reference.current
                .querySelector(".end-date-inputs")
                .querySelector(".buttons-wrapper")
                .classList.add("hidden");
            }
          }}
        >
          <p>
            <strong>{experience.position}</strong>, {experience.employer}
          </p>
          <p>
            {experience.beginDate.year === "Year"
              ? ""
              : experience.beginDate.year}
            -{experience.endDate.year === "Year" ? "" : experience.endDate.year}
          </p>
        </div>
      ))}
    </>
  );
}

function Bulletpoints({ data, setter }) {
  const handleAddingBullet = () => {
    let textAreaValue = document.getElementById("new-bullet").value;
    setter([...data, { id: uuidv4(), info: textAreaValue }]);
    document.getElementById("new-bullet").value = "";
  };

  return (
    <div className="bullets-wrapper">
      {
        <ul>
          {data.map((point) => (
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

                  e.target.parentElement.firstChild.classList.toggle(
                    "editing-bullet"
                  );

                  e.target.parentElement.firstChild.contentEditable = true;
                }}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setter(data.filter((li) => li.id !== point.id))}
              >
                Delete
              </button>
              <SaveAndCancelBtns bullet={point} />
            </li>
          ))}
        </ul>
      }
      <textarea name="new-bullet" id="new-bullet"></textarea>
      <button onClick={handleAddingBullet}>Add Bulletpoint</button>
    </div>
  );
}

export default function ExperienceComponent({
  savedExperiences,
  setSavedExperiences,
  presentBoolean,
  setPresentBoolean,
  bulletpoint,
  setBulletPoint,
  currentSelection,
  setCurrentSelection,
  expDateStorage,
  setExpDateStorage,
}) {
  const expContainerRef = useRef(null);
  const addExpBtnRef = useRef(null);
  const savedExpRef = useRef(null);

  function formReset() {
    //clear text from inputs
    document.getElementById("position").value = "";
    document.getElementById("employer").value = "";
    document.getElementById("exp-location").value = "";

    expContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".month-btn").textContent = "Month";

    expContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".year-btn").textContent = "Year";

    expContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".month-btn").textContent = "Month";

    expContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".year-btn").textContent = "Year";

    expContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".checkbox")
      .querySelector("#present-cb").checked = false;

    expContainerRef.current
      .querySelector(".date-range-component")
      .querySelector(".end-date-inputs")
      .querySelector(".buttons-wrapper")
      .classList.remove("hidden");

    setBulletPoint([]);
  }

  const toggleFormVisiblity = () => {
    expContainerRef.current.classList.toggle("hidden");
    addExpBtnRef.current.classList.toggle("hidden");
    savedExpRef.current.classList.toggle("hidden");
  };

  const handleSaveExperience = () => {
    const selectedYear =
      expContainerRef.current.querySelector("#present-cb").checked === true
        ? "Present"
        : expContainerRef.current
            .querySelector(".end-date-inputs")
            .querySelector(".year-btn").textContent;

    if (currentSelection.is_editing === true) {
      const selectedExp = savedExperiences.find(
        (exp) => exp.id === currentSelection.current_id
      );
      //get the index of the matching selected experience obj, and update the property values based on the information filled out in the form inputs
      let copy = [...savedExperiences];
      copy[copy.indexOf(selectedExp)] = {
        id: currentSelection.current_id,
        position: expContainerRef.current.querySelector("#position").value,
        employer: expContainerRef.current.querySelector("#employer").value,
        location: expContainerRef.current.querySelector("#exp-location").value,
        bulletPoints: [...bulletpoint],
        beginDate: {
          month: expContainerRef.current
            .querySelector(".begin-date-inputs")
            .querySelector(".month-btn").textContent,
          year: expContainerRef.current
            .querySelector(".begin-date-inputs")
            .querySelector(".year-btn").textContent,
        },
        endDate: {
          month: expContainerRef.current
            .querySelector(".end-date-inputs")
            .querySelector(".month-btn").textContent,
          year: selectedYear,
          present: expContainerRef.current.querySelector("#present-cb").checked,
        },
      };

      setSavedExperiences([...copy]);
    } else {
      setSavedExperiences([
        ...savedExperiences,
        {
          id: uuidv4(),
          position: document.getElementById("position").value,
          employer: document.getElementById("employer").value,
          location: document.getElementById("exp-location").value,
          beginDate: {
            month: expDateStorage.beginMonth,
            year: expDateStorage.beginYear,
          },
          endDate: {
            month: expDateStorage.endMonth,
            year: expDateStorage.endYear,
            present: presentBoolean,
          },
          bulletPoints: [...bulletpoint], //need to take bulletpoints and copy it here
        },
      ]);
    }

    console.log(savedExperiences);
    formReset();
    setCurrentSelection({
      ...currentSelection,
      current_id: "",
      is_editing: false,
    });
  };

  function handleEditingExperience(id) {
    setCurrentSelection({
      ...currentSelection,
      is_editing: true,
      current_id: id,
    });

    expContainerRef.current.classList.toggle("hidden");
    savedExpRef.current.classList.toggle("hidden");
    addExpBtnRef.current.classList.toggle("hidden");

    const currentExp = savedExperiences.find((exp) => exp.id === id);

    expContainerRef.current.querySelector("#position").value =
      currentExp.position;
    expContainerRef.current.querySelector("#employer").value =
      currentExp.employer;
    expContainerRef.current.querySelector("#exp-location").value =
      currentExp.location;
    expContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".month-btn").textContent = currentExp.beginDate.month;
    expContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".year-btn").textContent = currentExp.beginDate.year;
    expContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".month-btn").textContent = currentExp.endDate.month;
    expContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".year-btn").textContent = currentExp.endDate.year;

    expContainerRef.current.querySelector("#present-cb").checked =
      currentExp.endDate.present;

    setBulletPoint([...currentExp.bulletPoints]);
  }

  return (
    <div className="experience-section">
      <h1>Experience</h1>

      <div ref={savedExpRef}>
        <SavedExperiences
          data={savedExperiences}
          handler={handleEditingExperience}
          reference={expContainerRef}
        />
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
          <Location />
          <DateRange
            dateStorage={expDateStorage}
            dateStorageSetter={setExpDateStorage}
            setBoolean={setPresentBoolean}
          />
          <Bulletpoints data={bulletpoint} setter={setBulletPoint} />
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
