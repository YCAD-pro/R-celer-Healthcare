import { useEffect, useState } from "react";

const AddSiteToTrialComponent = () => {
  const [trials, setTrials] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedTrial, setSelectedTrial] = useState("");
  const [selectedSites, setSelectedSites] = useState([]);
  const [sitesInTrial, setSitesInTrial] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3080/trialsAlive")
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => setTrials(data));
  }, []);

  useEffect(() => {
    // il ne faut charger que les sites dans le trial choisi ou trier
    fetch("http://localhost:3080/sites")
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => setSites(data));
  }, [sitesInTrial]);

  useEffect(() => {
    if (selectedTrial !== "") {
      optionSitesAlreadyInTrial();
      fetch("http://localhost:3080/trial-site/" + selectedTrial)
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .then((data) => setSitesInTrial(data));
    }
  }, [selectedTrial, reload]);

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
    const filteredSites = sites.filter((site) => {
      const list_id = sitesInTrial.map((site) => site.site_id);
      return !list_id.includes(site.site_id);
    });

    return filteredSites.map((site, index) => {
      return (
        <option key={index} value={site.site_id}>
          {site.name}
        </option>
      );
    });
  }

  function optionSitesAlreadyInTrial() {
    return sitesInTrial.map((site) => {
      return (
        <option key={site.site_id} value={site.site_id}>
          {site.name}
        </option>
      );
    });
  }

  function refreshPage() {
    window.location.reload();
  }

  function perform(e) {
    e.preventDefault();
    console.log(
      `send request to add ${selectedSites} (site_id) to ${selectedTrial} (trial_id)`
    );
    //document.getElementById("form").reset();
    fetch("http://localhost:3080/trial-sites", {
      method: "POST",
      body: JSON.stringify({ sitesId: selectedSites, trialId: selectedTrial }),
      headers: { "Content-Type": "application/json" },
    })
      .then((rep) => rep.json())
      .then((data) => {
        console.log(data);
      });
    refreshPage();
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
  }

  function updateTrialForm(target) {
    setSelectedTrial(target);
  }

  return (
    <>
      <div className="container">
        <h1>Choose clinical trial to add site</h1>
        <form className="form form-control">
          <div className="row">
            <div className="col col-4">
              <label className="form-label" htmlFor="trial">
                Trials available :
              </label>
              <select
                className="form-select"
                id="trials"
                value={selectedTrial}
                onChange={(event) => updateTrialForm(event.target.value)}
              >
                {optionTrials()}
              </select>
            </div>
            <div className="col col-4">
              <label className="form-label" htmlFor="doctors">
                Choose Site(s) :
              </label>
              <select
                className="form-select"
                id="sites"
                onChange={(event) => updateSiteForm(event.target)}
                size="15"
                multiple
              >
                {optionSites()}
              </select>
            </div>
            <div className="col col-4">
              <label className="form-label" htmlFor="doctorsAlreadyIn">
                Sites already in this trial :
              </label>
              <select
                className="form-select"
                name="doctorsChosen"
                id="doctorsAlreadyIn"
                size="15"
                multiple
                disabled
              >
                {optionSitesAlreadyInTrial()}
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <button className="btn btn-success" onClick={(e) => perform(e)}>
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddSiteToTrialComponent;
