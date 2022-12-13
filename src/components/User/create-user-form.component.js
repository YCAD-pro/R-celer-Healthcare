import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUserFormComponent = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [passwordField, setPasswordField] = useState({});
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    mail: "",
    password: "",
    status: "",
  });

  function chooseUserType(e) {
    // TODO flush the form in case of change status...
    setUserType(e.target.value);
    setThisUser(e);
  }

  function setThisUser(event) {
    user[event.target.name] = event.target.value;
    setUser(user);
  }

  function checkPassword(event) {
    // check password are same ....
    // if yes, write in user
    // else mark the form to inform user....
    passwordField[event.target.name] = event.target.value;
    setPasswordField(passwordField);
    if (passwordField.password === passwordField.confirmPassword) {
      //make a green border
      user.password = passwordField.password;
      setUser(user);
    } else {
      // make a red border with text to explain
    }
  }

  function submitForm(event) {
    event.preventDefault();
    fetch("http://localhost:3080/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    // TODO Gestion de la description !!!
    navigate("/users");
  }
  return (
    <div className="container">
      <h2>add new person</h2>
      <form>
        <div className="card">
          <select
            name="status"
            className="form-select"
            aria-label="select for usertype"
            onChange={chooseUserType}
          >
            <option disabled selected>
              Witch user type to create ?
            </option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="project-manager">Project-manager</option>
          </select>
        </div>
        <br />
        <div className={` ${userType === "" ? "hidden" : ""}`}>
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
                  onChange={setThisUser}
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
                  onChange={setThisUser}
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
                  onChange={setThisUser}
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
                  onChange={setThisUser}
                />
              </div>
            </div>
          </div>
          <div className={`row ${userType === "patient" ? "hidden" : ""}`}>
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  🔐
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  name="password"
                  onChange={checkPassword}
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  🔏
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  name="confirmPassword"
                  onChange={checkPassword}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className={`mb-3 ${userType === "patient" ? "" : "hidden"}`}>
          <h1>C un patient...</h1>
          <div className="row">
            <div className="col" onChange={setThisUser}>
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
                onChange={setThisUser}
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
              <label htmlFor="birthday">Birthday :</label>
              <input
                id="birthday"
                type="date"
                name="birthday"
                onChange={setThisUser}
              />
            </div>
            <div className="col">
              <label htmlFor="work">Work :</label>
              <input id="work" type="text" name="work" onChange={setThisUser} />
            </div>
          </div>
          <label htmlFor="patientDescription">Patient description :</label>
          <textarea
            className="form-control"
            placeholder="Description"
            id="patientDescription"
            style={{ height: "100px" }}
            name="description"
            onChange={setThisUser}
          ></textarea>
        </div>
        <Link to={"/"}>
          <input type="submit" value="Create" onClick={submitForm} />
        </Link>
      </form>
    </div>
  );
};
export default CreateUserFormComponent;
