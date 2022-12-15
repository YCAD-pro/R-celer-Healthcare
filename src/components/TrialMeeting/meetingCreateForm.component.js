import { useEffect, useState } from "react";
import ChoosePatientFieldComponent from "./choosePatientField.component";
import MeetingDatePickerComponent from "./meetingDatePicker.component";

const MeetingCreateFormComponent = () => {
  const doctor_id = localStorage.id;
  const [trials, setTrials] = useState([]);
  const [trialChoose, setTrialChoose] = useState();
  const [patientChoose, setPatientChoose] = useState();
  const [dateChoose, setDateChoose] = useState();

  useEffect(() => {
    fetch("http://localhost:3080/trials-for-doc/" + doctor_id)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => {
        setTrials(data);
      });
  }, []);

  const fillTrialList = () => {
    return trials.map((trial) => {
      return (
        <option key={trial.trial_id} value={trial.trial_id}>
          {trial.name}
        </option>
      );
    });
  };

  function changeTrialChoose(target) {
    setTrialChoose(target.value);
  }

  function changePatientChoose(patientId) {
    console.log("PatientId is ", patientId);
    setPatientChoose(patientId);
    //document.getElementById("datePicker").hidden = false;
  }

  function changeDateChoose(choosenDate) {
    console.log("date:", choosenDate);
    setDateChoose(choosenDate);
  }

  function refreshPage() {
    window.location.reload();
  }

  const submit = () => {
    console.log("submit", {
      trialId: trialChoose,
      patientId: patientChoose,
      date: dateChoose,
      doctorId: doctor_id,
    });
    fetch("http://localhost:3080/meeting", {
      method: "POST",
      body: JSON.stringify({
        trialId: trialChoose,
        patientId: patientChoose,
        date: dateChoose,
        doctorId: doctor_id,
      }),
      headers: { "content-type": "application/json" },
    });
    setTimeout(() => {
      refreshPage();
    }, 250);
  };
  return (
    <div className="container col-8 mt-4">
      <div className="form form-control">
        <h1 className="form-label">Set a new patient appointment</h1>
        <div className="col-6">
          <label className="form-label mt-4" htmlFor="trialChoice">
            Choose trial :
          </label>
          <select
            className="form-select mt-0"
            id="trialChoice"
            name="trialChoice"
            onChange={(e) => changeTrialChoose(e.target)}
          >
            <option value="null" selected disabled>
              Choose a clinical trial...
            </option>
            {fillTrialList()}
          </select>
        </div>
        {trialChoose && (
          <ChoosePatientFieldComponent
            trialId={trialChoose}
            fctChange={changePatientChoose}
          />
        )}
        {patientChoose && (
          <MeetingDatePickerComponent fctDate={changeDateChoose} />
        )}
        {dateChoose && (
          <button className="btn btn-secondary mt-3" onClick={submit}>
            Commit Rendez-Vous
          </button>
        )}
      </div>
    </div>
  );
};
export default MeetingCreateFormComponent;
