import { Link } from "react-router-dom";
import "./site.style.css";

const SiteCardComponent = ({ site, image }) => {
  console.log(site);
  return (
    <div className="col-lg-2 col-md-3 col-sm-6 site-card">
      <div className="row">
        <div className="col-6">
          <img src={image} alt="imagePickup" />
        </div>
        <div className="col-6">
          <h4>{site.name}</h4>
          <p className="mt-sm-0">{site.address.street}</p>
          <div className="row">
            <p className="col-auto mt-0">{site.address.zip_code}</p>
            <p className="col-6 mt-0">{site.address.city}</p>
          </div>
          <p className="mt-0">{site.address.country}</p>
          <div className="container">
            <Link to={"/editSite/" + site.site_id}>
              <button className="btn btn-sm btn-secondary">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCardComponent;
