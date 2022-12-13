import "./doctors-line.style.css";

const DoctorsLineComponent = ({ doctor, img, removeFct }) => {
  return (
    <div className="row d-flex">
      <div className="col-2">
        <img src={img} />
      </div>
      <h5 className="col">{doctor.username}</h5>
      <p className="col-3">
        "{doctor.lastname} {doctor.firstname}"
      </p>
      <button
        className="btn btn-outline-danger btn-sm col-2"
        onClick={() => removeFct(doctor.doctor_id)}
      >
        REMOVE
      </button>
    </div>
  );
};
export default DoctorsLineComponent;
