import UserRowComponent from "./userRow.component";
import DoctorLogo from "../../Assets/doctor-logo.png";
import PMLogo from "../../Assets/project-manager.png";
import PatientLogo from "../../Assets/patient.png";

import { useEffect, useState } from "react";
import FilterUserTypeComponent from "./filterUserType.component";

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState("users");
  useEffect(() => {
    fetch("http://localhost:3080/" + filterType)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [filterType]);

  function getImageUser(status) {
    if (status === "patient") return PatientLogo;
    else if (status === "doctor") return DoctorLogo;
    else if (status === "project-manager") return PMLogo;
  }

  function generateList() {
    return users.map((user, index) => {
      return (
        <UserRowComponent
          key={index}
          user={user}
          img={getImageUser(user.status)}
        />
      );
    });
  }

  function changeFilterType(target) {
    console.log(target.value);
    setFilterType(target.value);
  }
  return (
    <div className="container col-8">
      <FilterUserTypeComponent change={changeFilterType} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Fonction</th>
            <th scope="col">Username</th>
            <th scope="col">eMail</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
          </tr>
        </thead>
        <tbody>{generateList()}</tbody>
      </table>
    </div>
  );
};
export default UserListComponent;
