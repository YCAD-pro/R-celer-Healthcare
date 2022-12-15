import React, { useEffect, useState } from "react";

function AddDocInSite(props) {
  const [freeDocs, setFreeDocs] = useState([]);
  const [sites, setSites] = useState([]);
  const [contentForm, setContentForm] = useState({});
  useEffect(() => {
    fetch("http://localhost:3080/doctorsNoSite")
      .then((res) => res.json())
      .then((data) => setFreeDocs(data));
    fetch("http://localhost:3080/sites")
      .then((res) => res.json())
      .then((data) => setSites(data));
  }, []);
  function listDocWithNoSite() {
    return freeDocs.map((doc, index) => {
      return <option key={index}>{doc.username}</option>;
    });
  }

  function listSite() {
    return sites.map((site, index) => {
      return (
        <option key={index} value={site.site_id}>
          {site.name}
        </option>
      );
    });
  }

  function addDocToSite(e) {
    e.preventDefault();
    fetch("http://localhost:3080/site_doctors/add/" + contentForm.site, {
      method: "POST",
      body: JSON.stringify(contentForm.doc),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function setInfo(e) {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "doc") {
      console.log("fetch");
      fetch("http://localhost:3080/user/" + e.target.value)
        .then((res) => res.json())
        .then((data) => {
          contentForm.doc = data;
          setContentForm(contentForm);
          console.log(contentForm);
        });
    } else {
      contentForm.site = e.target.value;
      setContentForm(contentForm);
    }
  }

  return (
    <div>
      <h1>Choose a doc and site to add</h1>
      <form onSubmit={(e) => addDocToSite(e)}>
        <label htmlFor="chooseDoc">Choose the doc :</label>
        <select name="doc" onChange={(e) => setInfo(e)}>
          <option defaultValue>Choose a doc</option>
          {listDocWithNoSite()}
        </select>
        <label htmlFor="chooseSite">Choose the site :</label>
        <select name="site" onChange={(e) => setInfo(e)}>
          <option defaultValue>Choose a site</option>
          {listSite()}
        </select>
        <input className="btn btn-success" type="submit" value="Add..." />
      </form>
    </div>
  );
}

export default AddDocInSite;
