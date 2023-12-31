/* eslint-disable react/prop-types */
import { useRef } from "react";
import DateRange from "./date-range.jsx";
import { v4 as uuidv4 } from "uuid";

function Degree() {
  return (
    <>
      Degree
      <label htmlFor="degree">
        <input type="text" name="degree" id="degree" />
      </label>
    </>
  );
}

function School() {
  return (
    <>
      School / University
      <label htmlFor="school">
        <input type="text" name="school" id="school" />
      </label>
    </>
  );
}

function Location() {
  return (
    <>
      Location
      <label htmlFor="edu-location">
        <input type="text" name="location" id="edu-location" />
      </label>
    </>
  );
}

//Render the list of saved education objects, and display them in a compact form
function SavedEducationList({ data, handler, reference }) {
  return (
    <div className="education-wrapper">
      {data.map((education) => (
        <div
          key={education.id}
          className="saved-education"
          style={{ marginBottom: ".5rem" }}
          onClick={() => {
            handler(education.id);

            //If selected div has a "present" end date, then make sure the end-year & end-month buttons are hidden
            if (education.endDate.present === true) {
              reference.current
                .querySelector(".end-date-inputs")
                .querySelector(".buttons-wrapper")
                .classList.add("hidden");
            }
          }}
        >
          <p className="row-one">
            <strong>{education.degree}</strong>, {education.school}
          </p>
          <p className="compact-date">
            {education.location} |{" "}
            {education.endDate.year === "Year" ? "" : education.endDate.year}
          </p>
          <div className="edit-symbol" style={{ opacity: 0 }} />
        </div>
      ))}
    </div>
  );
}

export default function EducationComponent({
  savedEducation,
  setSavedEducation,
  presentBoolean,
  setPresentBoolean,
  currentSelection,
  setCurrentSelection,
  educateStorage,
  setEducateStorage,
}) {
  const savedEduRef = useRef(null);
  const eduContainerRef = useRef(null);
  const addEduBtnRef = useRef(null);
  const eduSectionRef = useRef();

  const toggleFormVisiblity = () => {
    savedEduRef.current.classList.toggle("hidden");
    eduContainerRef.current.classList.toggle("hidden");
    addEduBtnRef.current.classList.toggle("hidden");
  };

  function formReset() {
    document.getElementById("school").value = "";
    document.getElementById("degree").value = "";
    document.getElementById("edu-location").value = "";
    eduContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".month-btn").textContent = "Month";

    eduContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".year-btn").textContent = "Year";

    eduContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".month-btn").textContent = "Month";

    eduContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".year-btn").textContent = "Year";

    eduContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".checkbox")
      .querySelector("#present-cb").checked = false;

    eduContainerRef.current
      .querySelector(".date-range-component")
      .querySelector(".end-date-inputs")
      .querySelector(".buttons-wrapper")
      .classList.remove("hidden");
  }
  const handleCancelEducation = () => {
    setCurrentSelection({
      ...currentSelection,
      current_id: "",
      is_editing: false,
    });
  };

  //Function will either add a completely new education object, or overwrite an object if it's targeted for editing
  const handleSaveEducation = () => {
    const selectedYear =
      eduContainerRef.current.querySelector("#present-cb").checked === true
        ? "Present"
        : eduContainerRef.current
            .querySelector(".end-date-inputs")
            .querySelector(".year-btn").textContent;

    if (currentSelection.is_editing === true) {
      const selectedEdu = savedEducation.find(
        (edu) => edu.id === currentSelection.current_id
      );

      //get the index of the matching selected education obj, and update the property values based on the information filled out in the form inputs
      let copy = [...savedEducation];
      copy[copy.indexOf(selectedEdu)] = {
        id: currentSelection.current_id,
        school: eduContainerRef.current.querySelector("#school").value,
        degree: eduContainerRef.current.querySelector("#degree").value,
        location: eduContainerRef.current.querySelector("#edu-location").value,
        beginDate: {
          month: eduContainerRef.current
            .querySelector(".begin-date-inputs")
            .querySelector(".month-btn").textContent,
          year: eduContainerRef.current
            .querySelector(".begin-date-inputs")
            .querySelector(".year-btn").textContent,
        },
        endDate: {
          month: eduContainerRef.current
            .querySelector(".end-date-inputs")
            .querySelector(".month-btn").textContent,
          year: selectedYear,
          present: eduContainerRef.current.querySelector("#present-cb").checked,
        },
      };

      setSavedEducation([...copy]);
    } else {
      setSavedEducation([
        ...savedEducation,
        {
          id: uuidv4(),
          school: eduContainerRef.current.querySelector("#school").value,
          degree: eduContainerRef.current.querySelector("#degree").value,
          location:
            eduContainerRef.current.querySelector("#edu-location").value,
          beginDate: {
            month: educateStorage.beginMonth,
            year: educateStorage.beginYear,
          },
          endDate: {
            month: educateStorage.endMonth,
            year: educateStorage.endYear,
            present: presentBoolean,
          },
        },
      ]);
    }

    formReset();
    setCurrentSelection({
      ...currentSelection,
      current_id: "",
      is_editing: false,
    });

    setEducateStorage({
      ...educateStorage,
      beginMonth: "Month",
      beginYear: "Year",
      endMonth: "Month",
      endYear: "Year",
      present: false,
    });
  };

  const handleDeleteEducation = () => {
    if (currentSelection.is_editing === true) {
      const removeSelected = savedEducation.filter(
        (edu) => edu.id !== currentSelection.current_id
      );
      setSavedEducation([...removeSelected]);
    }

    eduContainerRef.current.classList.toggle("hidden");
    savedEduRef.current.classList.toggle("hidden");
    addEduBtnRef.current.classList.toggle("hidden");
    formReset();
    setCurrentSelection({
      ...currentSelection,
      current_id: "",
      is_editing: false,
    });
  };

  function handleEditingEducation(id) {
    setCurrentSelection({
      ...currentSelection,
      is_editing: true,
      current_id: id,
    });

    eduContainerRef.current.classList.toggle("hidden");
    savedEduRef.current.classList.toggle("hidden");
    addEduBtnRef.current.classList.toggle("hidden");

    const currentEdu = savedEducation.find((edu) => edu.id === id);

    eduContainerRef.current.querySelector("#school").value = currentEdu.school;
    eduContainerRef.current.querySelector("#degree").value = currentEdu.degree;
    eduContainerRef.current.querySelector("#edu-location").value =
      currentEdu.location;
    eduContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".month-btn").textContent = currentEdu.beginDate.month;
    eduContainerRef.current
      .querySelector(".begin-date-inputs")
      .querySelector(".year-btn").textContent = currentEdu.beginDate.year;
    eduContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".month-btn").textContent = currentEdu.endDate.month;
    eduContainerRef.current
      .querySelector(".end-date-inputs")
      .querySelector(".year-btn").textContent = currentEdu.endDate.year;

    eduContainerRef.current.querySelector("#present-cb").checked =
      currentEdu.endDate.present;
  }

  return (
    <div ref={eduSectionRef} className="education-section">
      <h1>Education</h1>
      <div ref={savedEduRef}>
        <SavedEducationList
          data={savedEducation}
          handler={handleEditingEducation}
          reference={eduContainerRef}
        />
      </div>
      <button
        ref={addEduBtnRef}
        onClick={(e) => {
          eduContainerRef.current.classList.toggle("hidden");
          savedEduRef.current.classList.toggle("hidden");
          e.target.classList.toggle("hidden");
          eduSectionRef.current.scrollIntoView({
            alignToTop: true,
            behavior: "smooth",
          });

        }}
      >
        + New Education
      </button>

      <div ref={eduContainerRef} className="education-container hidden">
        <div>
          <School />
          <Degree />
          <Location />
          <DateRange
            dateStorage={educateStorage}
            dateStorageSetter={setEducateStorage}
            setBoolean={setPresentBoolean}
          />
        </div>
        <div className="container-btns">
          <button className="form-delete-btn" onClick={handleDeleteEducation}>
            Delete
          </button>
          <div>
            <button
              className="education cancel-btn"
              onClick={() => {
                handleCancelEducation();
                toggleFormVisiblity();
                formReset();
              }}
            >
              Cancel
            </button>
            <button
              className="education save-btn"
              onClick={() => {
                toggleFormVisiblity();
                handleSaveEducation();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
