import { useEffect, useState } from "react";
import CreatePatientComponent from "../User/create-patient.component";
import PickPatientComponent from "../User/pick-patient.component";
import { Link, useNavigate } from "react-router-dom";

const AddPatientToTrialComponent = () => {
  const navigate = useNavigate();
  const docId = localStorage.id;
  const [addOrCreateForm, setAddOrCreateForm] = useState("add");
  const [patientsWithoutTrial, setPatientsWithoutTrial] = useState([]);
  const [trials, setTrials] = useState([]);
  const [trialToAdd, setTrialToAdd] = useState();
  const [patientToAdd, setPatientToAdd] = useState();
  const [newPatient, setNewPatient] = useState({
    status: "patient",
  });

  useEffect(() => {
    // getTrialforThe doc connected
    fetch("http://localhost:3080/patientsWithoutTrial")
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => setPatientsWithoutTrial(data));
  }, []);

  useEffect(() => {
    // getAllPatient without trial
    fetch("http://localhost:3080/trials-for-doc/" + docId)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => {
        setTrials(data);
      });
  }, []);

  const fillTrials = () => {
    return trials.map((trial) => {
      return (
        <option key={trial.trial_id} value={trial.trial_id}>
          {trial.name}
        </option>
      );
    });
  };

  const trialSelected = (event) => {
    setTrialToAdd(event.target.value);
    document.getElementById("addOrCreate").hidden = false;
  };

  function addOrCreateFill(event) {
    setAddOrCreateForm(event.target.value);
  }

  function patientChange(e) {
    setPatientToAdd(e.target.value);
  }

  function setThisUser(field) {
    newPatient[field.name] = field.value;
    setNewPatient(newPatient);
  }

  function submitFormPatient(e) {
    e.preventDefault();
    if (addOrCreateForm === "add") {
      fetch("http://localhost:3080/trial-patient/", {
        method: "PUT",
        body: JSON.stringify({ patientId: patientToAdd, trialId: trialToAdd }),
        headers: { "content-type": "application/json" },
      });
    } else {
      fetch("http://localhost:3080/trial-patient/", {
        method: "POST",
        body: JSON.stringify({ patient: newPatient, trialId: trialToAdd }),
        headers: { "content-type": "application/json" },
      });
    }
    navigate("/meetingView");
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <form
          onSubmit={(e) => submitFormPatient(e)}
          className="form form-controle"
        >
          <h1 className="form-label">Add Patient to Trial</h1>
          <div className="col col-8 mt-4">
            <label className="form-label" htmlFor="trial">
              Choose clinical trial
            </label>
            <select
              className="form-select"
              name="trial"
              id="trial"
              onChange={(e) => trialSelected(e)}
            >
              <option value="0" disabled selected>
                Choose one clinical trial
              </option>
              {fillTrials()}
            </select>
          </div>

          <div className=" col-12" id="addOrCreate" hidden>
            <div className="row mt-4">
              <div className="col-2">
                <label className="form-label" htmlFor="chooseAddOrCreate">
                  Add user or find one ?
                </label>
              </div>
              <div className="col-6">
                <select
                  className="form-select"
                  name="chooseAddOrCreate"
                  id="chooseAddOrCreate"
                  onChange={(e) => addOrCreateFill(e)}
                >
                  <option value="add">Add Patient from list</option>
                  <option value="create">Create new Patient</option>
                </select>
              </div>
            </div>
            <div>
              <div className="row">
                {addOrCreateForm === "add" ? (
                  <PickPatientComponent
                    withoutPatient={patientsWithoutTrial}
                    fonctionChange={patientChange}
                  />
                ) : (
                  <CreatePatientComponent fonctionChange={setThisUser} />
                )}
              </div>
            </div>
            <Link to={"/"}>
              <input
                className="btn btn-secondary mt-2"
                type="submit"
                value={`Add to clinical trial`}
                onClick={(e) => submitFormPatient(e)}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPatientToTrialComponent;
