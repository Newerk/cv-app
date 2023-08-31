//make sure to give the option for the user to select 'Present' if they are still currently involved

export default function DateRange() {
    return (
      <>
        <label htmlFor="">
          <div className="date-container">
            <div className="date-wrapper">
              Begin
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                className="date"
              />
            </div>
            <div className="date-wrapper">
              End
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                className="date"
              />
            </div>
          </div>
        </label>
      </>
    );
  }
  