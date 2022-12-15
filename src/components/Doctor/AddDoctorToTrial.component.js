import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDoctorToTrialComponent = () => {
  const navigate = useNavigate();
  const [trials, setTrials] = useState([]);
  const [sites, setSites] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorsInTrial, setDoctorsInTrial] = useState([]);
  const [selectedTrial, setSelectedTrial] = useState();
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3080/trialsAlive")
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => setTrials(data));
  }, []);

  useEffect(() => {
    if (selectedTrial !== undefined) {
      fetch("http://localhost:3080/trial-site/" + selectedTrial)
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .then((data) => setSites(data));
    }
  }, [selectedTrial]);

  useEffect(() => {
    setDoctors([]);
    for (let i = 0; i < sites.length; i++) {
      fetch("http://localhost:3080/site_doctors/" + sites[i].site_id)
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .then((data) => {
          data.forEach((val) => {
            setDoctors((old) => [...old, val]);
          });
        });
    }
  }, [sites]);

  useEffect(() => {
    setDoctorsInTrial([]);
    fetch("http://localhost:3080/trial-doctors/" + selectedTrial)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => {
        data.map((doctor) =>
          setDoctorsInTrial((old) => [...old, doctor.doctor_id])
        );
      });
  }, [selectedTrial]);

  function fillTrialList() {
    return trials.map((trial) => (
      <option value={trial.trial_id} key={trial.trial_id}>
        {trial.name}
      </option>
    ));
  }

  function chosenTrialChange(target) {
    setSelectedTrial(target.value);
  }

  function fillDoctorsList() {
    return doctors.map((doctor) => {
      if (!doctorsInTrial.includes(doctor.doctor_id)) {
        return (
          <option value={doctor.doctor_id} key={doctor.doctor_id}>
            {doctor.firstname} {doctor.lastname} ({doctor.username})
          </option>
        );
      }
      return null;
    });
  }
  function fillDoctorsListIn() {
    return doctors.map((doctor) => {
      if (doctorsInTrial.includes(doctor.doctor_id)) {
        return (
          <option value={doctor.doctor_id} key={doctor.doctor_id}>
            {doctor.firstname} {doctor.lastname} ({doctor.username})
          </option>
        );
      }
      return null;
    });
  }

  function chosenDoctorsChange(target) {
    let options = target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedDoctors(value);
  }

  function sendRequest(event) {
    event.preventDefault();
    fetch("http://localhost:3080/trial-doctors", {
      method: "POST",
      body: JSON.stringify({
        clinical_trial_id: selectedTrial,
        doctors_id: selectedDoctors,
      }),
      headers: { "Content-type": "application/json" },
    });
    navigate("/trial/" + selectedTrial);
    console.log("send doc", selectedDoctors, "for trial", selectedTrial);
  }

  return (
    <div className="container">
      <h1>Choose trial to add doctor(s)</h1>
      <form className="form form-control">
        <div className="row">
          <div className="col col-4">
            <label className="form-label" htmlFor="trial">
              Trials available :
            </label>
            <select
              className="form-select"
              name="trialChoose"
              id="trial"
              onChange={(event) => chosenTrialChange(event.target)}
            >
              <option disabled selected>
                Choose clinical Trial
              </option>
              {fillTrialList()}
            </select>
          </div>
          <div className="col col-4">
            <label className="form-label" htmlFor="doctors">
              Doctor :
            </label>
            <select
              className="form-select"
              name="doctorsChoose"
              id="doctors"
              onChange={(event) => chosenDoctorsChange(event.target)}
              multiple
            >
              {fillDoctorsList()}
            </select>
          </div>
          <div className="col col-4">
            <label className="form-label" htmlFor="doctorsAlreadyIn">
              Doctor :
            </label>
            <select
              className="form-select"
              name="doctorsChosen"
              id="doctorsAlreadyIn"
              multiple
              disabled
            >
              {fillDoctorsListIn()}
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <button className="btn btn-success" onClick={(e) => sendRequest(e)}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddDoctorToTrialComponent;
