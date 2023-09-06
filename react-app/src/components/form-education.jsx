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
  return (
    <>
      <h1>
        Education <span>*optional*</span>
      </h1>
      <School />
      <Degree />
      <DateRange />
    </>
  );
}
