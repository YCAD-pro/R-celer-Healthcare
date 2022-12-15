const PickPatientComponent = (props) => {
  function fillPatients() {
    if (props.withoutPatient) {
      return props.withoutPatient.map((patient) => {
        return (
          <option value={patient.patient_id} key={patient.patient_id}>
            {patient.firstname} | {patient.lastname} | {patient.mail}
          </option>
        );
      });
    }
    return null;
  }

  return (
    <div className="row mt-4 ">
      <div className="col col-2">
        <label className="form-label" htmlFor="existingPatients">
          Pick a patient{" "}
        </label>
      </div>
      <div className="col col-6">
        <select
          className="form-select"
          name="patients"
          id="existingPatients"
          onChange={(e) => props.fonctionChange(e)}
        >
          <option value="0" selected disabled>
            Choose your patient
          </option>
          {fillPatients()}
        </select>
      </div>
    </div>
  );
};
export default PickPatientComponent;
