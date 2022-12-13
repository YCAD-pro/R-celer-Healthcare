import moment from "moment";

const MeetingFormComponent = () => {
  const props = {
    clinical_trial_id: 0,
    patient_id: 0,
    doctor_id: 0,
    date_meeting: moment(new Date()).format("YYYY-MM-DDThh:mm"),
    report: "Le rapport",
    clinical_trial: {
      name: "name_clinical",
      molecule: "Molecule_type",
    },
    patient: {
      patient_id: 0,
      firstname: "Yannick",
      lastname: "CADET",
    },
    doctor: {
      username: "DOC-USERNAME",
    },
  };
  return (
    <div className="container col-8 mt-3">
      <form>
        <div className="row mb-3">
          <label htmlFor="meeting-time" className="col-sm-2 col-form-label">
            Meeting :
          </label>
          <div className="col-sm-10">
            <input
              type="datetime-local"
              className="form-control"
              id="meeting-time"
              value={props.date_meeting}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2">Clinical Trial :</div>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Trial name"
              value={props.clinical_trial.name}
              disabled
            />
          </div>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Trial Molecule"
              value={props.clinical_trial.molecule}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2">Patient : </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={props.patient.firstname}
              disabled
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={props.patient.lastname}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col col-2">Report :</div>
          <div className="col col-10 mb-3">
            <textarea className="form-control" id="report" rows="5"></textarea>
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
export default MeetingFormComponent;
