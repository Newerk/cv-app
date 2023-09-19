//this file will be deleted once project is ready for deployment.

export let savedExperiencesData = [
  {
    id: 0,
    position: "Software Engineer",
    employer: "Some Tech Place",
    location: "Tampa",
    beginDate: { month: "June", year: "2020" },
    endDate: { month: "Month", year: "Present", present: true },
    bulletPoints: [
      { id: 0, info: "I did this" },
      { id: 1, info: "I did that" },
      { id: 2, info: "I did everything" },
    ], //most recent saved project will be copied here (...bulletpoints). when this is being edited, it will pull the bulletpoint info from here instead
  },
  {
    id: 1,
    position: "Accountant",
    employer: "Paperboy Finance, LLC",
    location: "Texas",
    beginDate: { month: "April", year: "2009" },
    endDate: { month: "November", year: "2020", present: false },
    bulletPoints: [], //most recent saved project will be copied here (...bulletpoints). when this is being edited, it will pull the bulletpoint info from here instead
  },
  {
    id: 2,
    position: "Teacher",
    employer: "P.S. Ovr 9000",
    location: "Tennessee",
    beginDate: { month: "December", year: "2005" },
    endDate: { month: "August", year: "2008", present: false },
    bulletPoints: [], //most recent saved project will be copied here (...bulletpoints). when this is being edited, it will pull the bulletpoint info from here instead
  },
];
