const FilterUserTypeComponent = (props) => {
  return (
    <form
      className="form col-12"
      onChange={(event) => props.change(event.target)}
    >
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="filterUserType"
          id="allChoice"
          value="users"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="allChoice">
          All Type
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="filterUserType"
          id="pmChoice"
          value="pms"
        />
        <label className="form-check-label" htmlFor="pmChoice">
          Project-manager
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="filterUserType"
          id="doctorChoice"
          value="doctors"
        />
        <label className="form-check-label" htmlFor="doctorChoice">
          Doctors
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="filterUserType"
          id="patientChoice"
          value="patients"
        />
        <label className="form-check-label" htmlFor="patientChoice">
          Patients
        </label>
      </div>
    </form>
  );
};
export default FilterUserTypeComponent;
