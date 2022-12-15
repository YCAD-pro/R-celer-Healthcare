import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DoctorsLineComponent from "../Doctor/doctors-line.component";
import DoctorLogo from "../../Assets/doctor-logo.png";

const SiteFocusComponent = (props) => {
  const [update, setUpdate] = useState(0);
  const { idSite } = useParams();
  const isUpdate = props.update;
  const [docInSite, setDocInSite] = useState([]);
  const [site, setSite] = useState({
    site_id: 0,
    name: "",
    street: "",
    zip_code: "",
    city: "",
    country: "",
  });
  useEffect(() => {
    if (isUpdate) {
      fetch("http://localhost:3080/flatSite/" + idSite)
        .then((data) => data.json())
        .catch((err) => console.error(err))
        .then((data) => {
          setSite(data);
        });
      // fetch doc in site
      fetch("http://localhost:3080/site_doctors/" + idSite)
        .then((data) => data.json())
        .catch((err) => console.error(err))
        .then((data) => setDocInSite(data));
    }
  }, [update]);

  const addInfo = (event) => {
    let siteTemp = { ...site };
    siteTemp[event.target.id] = event.target.value;
    console.log(siteTemp);
    setSite(siteTemp);
  };

  const sendForm = (event) => {
    event.preventDefault();
    fetch("http://localhost:3080/site/", {
      method: isUpdate ? "PUT" : "POST",
      body: JSON.stringify(site),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((retour) => {
        if (retour.error) console.error(retour.error);
      });
  };

  const deleteSite = () => {
    // TODO CHECK NO DOC IN SITE BEFORE DELETE !!!!
    fetch("http://localhost:3080/site/" + idSite, {
      method: "DELETE",
      body: JSON.stringify(site),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.error(err));
  };

  const listDocOfSite = () => {
    if (docInSite.length > 0) {
      return docInSite.map((doc, index) => {
        return (
          <DoctorsLineComponent
            key={index}
            doctor={doc}
            img={DoctorLogo}
            removeFct={removeDocToSite}
          />
        );
      });
    }
    return "";
  };

  const removeDocToSite = (idDoc) => {
    console.log("retrait de " + idDoc + " au site " + idSite);
    fetch("http://localhost:3080/site_doctors/remove/" + idDoc, {
      method: "DELETE",
    }).catch((err) => console.error(err));
    setTimeout(() => {
      setUpdate(Date.now());
    }, 250);
  };

  return (
    <div>
      <br />
      <div className="row">
        <div className="col-md-6 col-xd-12">
          <form className="form form-control" onSubmit={(e) => sendForm(e)}>
            <label className="form-label" htmlFor="name">
              Site name :
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              defaultValue={site.name}
              onInput={(e) => addInfo(e)}
            />

            <label className="form-label" htmlFor="street">
              Street :
            </label>
            <input
              className="form-control"
              type="text"
              id="street"
              onInput={(e) => addInfo(e)}
              defaultValue={site.street}
            />

            <label className="form-label" htmlFor="zip_code">
              Zip Code :
            </label>
            <input
              className="form-control"
              type="text"
              id="zip_code"
              onInput={(e) => addInfo(e)}
              defaultValue={site.zip_code}
            />

            <label className="form-label" htmlFor="city">
              City :
            </label>
            <input
              className="form-control"
              type="text"
              id="city"
              onInput={(e) => addInfo(e)}
              defaultValue={site.city}
            />

            <label className="form-label col-2" htmlFor="country">
              Country :
            </label>
            <input
              className="form-control col-8"
              type="text"
              id="country"
              onInput={(e) => addInfo(e)}
              defaultValue={site.country}
            />
            <input
              className="btn btn-primary mt-2"
              type="submit"
              value={isUpdate ? "UPDATE" : "CREATE"}
            />
            {isUpdate ? (
              <button className="btn btn-danger ms-2 mt-2" onClick={deleteSite}>
                DELETE
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className="col-md-6 col-xd-12">
          <h2>list the doc</h2>
          {/*TODO inclure une nav de filtre*/}
          {listDocOfSite()}
          <Link to="/addDocToSite">
            <button>Add Doc to site</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SiteFocusComponent;
