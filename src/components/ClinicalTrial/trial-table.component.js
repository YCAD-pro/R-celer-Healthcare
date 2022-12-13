import { useEffect, useState } from "react";
import TrialRowComponent from "./trial-row.component";
import { useNavigate } from "react-router-dom";

const TrialTableComponent = () => {
  const [trials, setTrials] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3080/trials")
      .then((rep) => rep.json())
      .catch((err) => console.error(err))
      .then((data) => setTrials(data));
  }, []);

  const populateTrials = () => {
    return trials.map((trial, index) => {
      return <TrialRowComponent key={index} trial={trial} goTo={goToTrial} />;
    });
  };

  const goToTrial = (trial_id) => {
    navigate("/trial/" + trial_id);
  };

  return (
    <div className="container">
      <h2>Trials TABLE</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Molecule</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Status</th>
            <th scope="col">Nb Doc</th>
            <th scope="col">Nb Patient</th>
          </tr>
        </thead>
        <tbody>{populateTrials()}</tbody>
      </table>
    </div>
  );
};
export default TrialTableComponent;
