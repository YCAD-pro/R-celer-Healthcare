import { useEffect, useState } from "react";

const AddSiteToTrialComponent = () => {
  const [trials, setTrials] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedTrial, setSelectedTrial] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/trialsAlive")
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => setTrials(data));
    fetch("http://localhost:3080/sites")
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => setSites(data));
  }, []);

  function optionTrials() {
    return trials.map((trial) => {
      return (
        <option key={trial.trial_id} value={trial.trial_id}>
          {trial.name}
        </option>
      );
    });
  }

  function optionSites() {
    return sites.map((site, index) => {
      return (
        <option key={index} value={site.site_id}>
          {site.name}
        </option>
      );
    });
  }

  function perform() {
    console.log(
      `send request to add ${selectedSites} (site_id) to ${selectedTrial} (trial_id)`
    );
    document.getElementById("form").reset();
    fetch("http://localhost:3080/trial-sites", {
      method: "POST",
      body: JSON.stringify({ sitesId: selectedSites, trialId: selectedTrial }),
      headers: { "Content-Type": "application/json" },
    })
      .then((rep) => rep.json())
      .then((data) => {
        console.log(data);
      });
  }

  function updateSiteForm(target) {
    let options = target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedSites(value);
    console.log("sites", value);
  }

  function updateTrialForm(target) {
    setSelectedTrial(target);
  }

  return (
    <div className="container mt-2">
      <h2>Choose clinical trial to add site</h2>
      <div className="row mt-4">
        <div className="col col-4">
          <form id="form">
            <label htmlFor="trials">Choose Trial(s)</label>
            <select
              className="form-select"
              id="trials"
              onChange={(event) => updateTrialForm(event.target.value)}
            >
              {optionTrials()}
            </select>
          </form>
        </div>
        <div className="col col-4">
          <form>
            <label htmlFor="sites">Choose Site(s)</label>
            <select
              className="form-select"
              id="sites"
              onChange={(event) => updateSiteForm(event.target)}
              multiple
            >
              {optionSites()}
            </select>
          </form>
        </div>
        <div className="col col-2 d-flex">
          <button className="btn btn-success" onClick={() => perform()}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddSiteToTrialComponent;
