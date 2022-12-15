import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment, { locale } from "moment";

function SingleTrial() {
  locale("fr");
  let { idTrial } = useParams();
  const [trial, setTrial] = useState({
    trial_id: 0,
    name: "",
    molecule: "",
    start_date: "",
    end_date: "",
    status: "",
    creation_date: "",
    test_test: "montest",
    creator: {
      pm_id: 0,
      username: "",
    },
    description: "",
  });

  function loadTrial(idTrial) {
    fetch("http://localhost:3080/trial/" + idTrial)
      .then((ret) => ret.json())
      .then((data) => setTrial(data));
  }

  useEffect(() => {
    loadTrial(idTrial);
  }, []);

  function stopTrial() {
    // eslint-disable-next-line no-restricted-globals
    let result = confirm(
      "This action will close this Clinical trial.\nAre you sure ?"
    );
    if (result) {
      console.log("send the request to make the status closed");
      trial.status = "stopped";
      trial.end_date = new Date();
      fetch("http://localhost:3080/trial/" + trial.trial_id, {
        method: "PUT",
        body: JSON.stringify(trial),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((retour) => {
          if (retour.error) console.error(retour.error);
        });
    }
  }

  return (
    <div className="bd-example">
      <div className="card">
        <img src="/logo192.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{trial.name}</h5>
          <p className="card-text">{trial.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Molecule : {trial.molecule}</li>
          <li className="list-group-item">Status : {trial.status}</li>
          <li className="list-group-item">
            Date : {Moment(trial.start_date).format("D MMM-yy")} ----->{" "}
            {Moment(trial.end_date).format("D MMM-YY")}
          </li>
          <li className="list-group-item">Owner : {trial.creator.username}</li>
        </ul>
        <div className="card-body text-center">
          {/*<Link to={""} className="btn btn-primary me-3">*/}
          {/*  Add SiteCardComponent*/}
          {/*</Link>*/}
          {/*<Link to={""} className="btn btn-success me-3">*/}
          {/*  Add Doctor*/}
          {/*</Link>*/}
          <Link to={""} className="btn btn-warning me-3">
            Edit trial
          </Link>
          <button className="btn btn-danger me-3" onClick={() => stopTrial()}>
            Stop trial
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleTrial;
