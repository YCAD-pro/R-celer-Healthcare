import { useEffect, useState } from "react";
import TrialLineComponent from "./trialLine.component";

const DoctorListClinicalTrialComponent = () => {
  const [trials, setTrials] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/trials-for-doc/" + localStorage.id)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => {
        console.log("received Trials=>", data);
        setTrials(data);
      });
  }, []);
  function loadDoctorsCT() {
    return trials.map((trial) => {
      return <TrialLineComponent trial={trial} />;
    });
  }

  return (
    <div className="container">
      <h1>
        Clinical trials you're in <code>{localStorage.username}</code>
      </h1>
      {loadDoctorsCT()}
    </div>
  );
};
export default DoctorListClinicalTrialComponent;
