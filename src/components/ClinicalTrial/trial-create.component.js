import { useState } from "react";

const TrialCreateComponent = () => {
  const [newTrial, setNewTrial] = useState({
    name: "",
    molecule: "",
    start_date: "",
    end_date: "",
    creator: localStorage.id,
    description: "",
  });

  const formUpdate = (event) => {
    newTrial[event.target.name] = event.target.value;
    setNewTrial(newTrial);
  };

  const sendForm = (event) => {
    event.preventDefault();
    fetch("http://localhost:3080/trial", {
      method: "POST",
      body: JSON.stringify(newTrial),
      headers: { "content-type": "application/json" },
    });
  };

  return (
    <div className="container">
      <h1 className="form-label">Trial creation</h1>
      <form className="form form-control">
        <div className="row">
          <div className="col col-6">
            <label className="form-label" htmlFor="trialName">
              Trial name :
            </label>
            <input
              className="form-control"
              type="text"
              id="trialName"
              name="name"
              onChange={(e) => formUpdate(e)}
            />
          </div>
          <div className="col col-6">
            <label className="form-label" htmlFor="trialMolecule">
              Molecule :
            </label>
            <input
              className="form-control"
              type="text"
              id="trialMolecule"
              name="molecule"
              onChange={(e) => formUpdate(e)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col col-6">
            <label className="form-label" htmlFor="startDate">
              Start date :
            </label>
            <input
              className="form-control"
              type="date"
              id="startDate"
              name="start_date"
              onChange={(e) => formUpdate(e)}
            />
          </div>
          <div className="col col-6 ">
            <label className="form-label" htmlFor="stopDate">
              End date :
            </label>
            <input
              className="form-control"
              type="date"
              id="stopDate"
              name="end_date"
              onChange={(e) => formUpdate(e)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col.col-8 mt-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              name="description"
              onChange={(e) => formUpdate(e)}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-success mt-3" onClick={(e) => sendForm(e)}>
          Create
        </button>
      </form>
    </div>
  );
};
export default TrialCreateComponent;
