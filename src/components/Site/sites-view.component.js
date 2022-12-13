import React, { useEffect, useState } from "react";
import SiteCardComponent from "./site-card.component";

const SitesViewComponent = () => {
  const [sites, setSites] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/sites")
      .then((rep) => rep.json())
      .catch((err) => console.error(err))
      .then((data) => setSites(data));
  }, []);

  function injectList() {
    if (sites.length === 0) {
      return <h2>No site to view</h2>;
    } else {
      return sites.map((site, index) => {
        return (
          <SiteCardComponent
            key={index}
            site={site}
            image={`https://picsum.photos/id/${site.site_id + 10}/180/210`}
          />
        );
      });
    }
  }

  return (
    <div className="container">
      <h2>Sites list</h2>
      <div className="row">{injectList()}</div>
    </div>
  );
};
export default SitesViewComponent;
