import { Link } from "react-router-dom";
import "./site.style.css";

const SiteCardComponent = (props) => {
  return (
    <Link to={"/editSite/" + props.site.site_id}>
      <div className="col-lg-2 col-md-3 col-sm-6 site-card">
        <div className="row">
          <div className="col-6">
            <img src={props.image} alt="imagePickup" />
          </div>
          <div className="col-6">
            <h4>{props.site.name}</h4>
            <p>{props.site.address.street}</p>
            <p>{props.site.address.zip_code}</p>
            <p>{props.site.address.city}</p>
            <p>{props.site.address.country}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SiteCardComponent;
