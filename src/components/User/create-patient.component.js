const CreatePatientComponent = (props) => {
  return (
    <div className="container">
      <h2>add new person</h2>
      <br />
      <div className="row">
        <div className="col">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              🙂
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="username"
              onChange={(e) => props.fonctionChange(e.target)}
            />
          </div>
        </div>
        <div className="col">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              📫
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="mail"
              onChange={(e) => props.fonctionChange(e.target)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              📇
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Firstname"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="firstname"
              onChange={(e) => props.fonctionChange(e.target)}
            />
          </div>
        </div>
        <div className="col">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              📇
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Lastname"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="lastname"
              onChange={(e) => props.fonctionChange(e.target)}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="mb-3">
        <div className="row">
          <div className="col" onChange={(e) => props.fonctionChange(e.target)}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                id="genderMale"
              />
              <label className="form-check-label" htmlFor="genderMale">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                id="genderFemale"
              />
              <label className="form-check-label" htmlFor="genderFemale">
                Female
              </label>
            </div>
          </div>
          <div className="col">
            <div>STATUS</div>
            <select
              className="form-select"
              aria-label="status_marital select"
              name="status_marital"
              onChange={(e) => props.fonctionChange(e.target)}
            >
              <option value="single">Single</option>
              <option value="couple">In couple</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label" htmlFor="birthday">
              Birthday :
            </label>
            <input
              className="form-control"
              id="birthday"
              type="date"
              name="birthday"
              onChange={(e) => props.fonctionChange(e.target)}
            />
          </div>
          <div className="col">
            <label className="form-label" htmlFor="work">
              Work :
            </label>
            <input
              className="form-control"
              id="work"
              type="text"
              name="work"
              onChange={(e) => props.fonctionChange(e.target)}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="patientDescription">Patient description :</label>
        <textarea
          className="form-control"
          placeholder="Description"
          id="patientDescription"
          style={{ height: "100px" }}
          name="description"
          onChange={(e) => props.fonctionChange(e.target)}
        ></textarea>
      </div>
    </div>
  );
};
export default CreatePatientComponent;
