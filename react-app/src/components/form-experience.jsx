import { useState } from "react";
import { bulletPointsData } from "../data/bulletpoints";
import DateRange from "./date-range";

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

// function BulletPoints() {
// }

export default function ExperienceComponent() {
  const [bulletpoint, setBulletPoint] = useState(bulletPointsData);

  const handleAddingBullet = () => {
    setBulletPoint([...bulletpoint, { id: "test", info: document.getElementById('new-bullet').value }]);
  };

  return (
    <>
      <h1>Experience</h1>
      <div>
        <JobTitle />
        <Company />
        <DateRange />
      </div>
      <div className="bullets-wrapper">
        {
          <ul>
            {bulletpoint.map((point) => (
              <li key={point.id}>
                <p>{point.info}</p>
                <button>Edit</button>
                <button>Delete</button>
              </li>
            ))}
          </ul>
        }
        <textarea name="new-bullet" id="new-bullet"></textarea>
        <button onClick={handleAddingBullet}>Add Bulletpoint</button>
      </div>
    </>
  );
}
