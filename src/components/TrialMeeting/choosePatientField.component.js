import { useEffect, useState } from "react";

const ChoosePatientField = ({ trialId, fctChange }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3080/trial-patients/" + trialId)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => setPatients(data));
  }, []);

  function fillPatients() {
    return patients.map((patient) => {
      return (
        <option key={patient.patient_id} value={patient.patient_id}>
          {patient.lastname} {patient.firstname}
        </option>
      );
    });
  }

  return (
    <div className="col-6">
      <label className="form-label mt-4" htmlFor="choosePatient">
        Choose patient :
      </label>
      <select
        className="form-select col-6 mt-0"
        name="choosePatient"
        id="choosePatient"
        onChange={(e) => fctChange(e.target.value)}
      >
        {fillPatients()}
      </select>
    </div>
  );
};
export default ChoosePatientField;
