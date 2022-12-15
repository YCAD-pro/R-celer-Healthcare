import moment from "moment";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MeetingFormComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // TODO change doctorId with logged doc
  const props = {
    clinical_trial_id: state.idMeeting,
    patient_id: state.patient.patient_id,
    doctor_id: localStorage.id,
    date_meeting: moment(state.date).format("yyyy-MM-DDTHH:mm"),
    report: "",
    clinical_trial: state.trial,
    patient: state.patient,
    doctor: {
      username: localStorage.username,
    },
  };

  const [meeting, setMeeting] = useState(props);

  const fillMeeting = (e) => {
    meeting[e.name] = e.value;
    setMeeting(meeting);
  };

  const submitMeeting = (e) => {
    e.preventDefault();
    fetch("http://localhost:3080/meeting", {
      method: "PUT",
      body: JSON.stringify({
        id_meeting: state.idMeeting,
        report: meeting.report,
      }),
      headers: { "content-type": "application/json" },
    });
    setTimeout(() => {
      navigate("/meetingView");
    }, 1000);
  };

  return (
    <div className="container col-8 mt-3">
      <form onSubmit={(e) => submitMeeting(e)}>
        <div className="row mb-3">
          <label htmlFor="meeting-time" className="col-sm-2 col-form-label">
            Meeting :
          </label>
          <div className="col-sm-10">
            <input
              type="datetime-local"
              className="form-control"
              id="meeting-time"
              value={meeting.date_meeting}
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
              value={meeting.clinical_trial.name}
              disabled
            />
          </div>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Trial Molecule"
              value={meeting.clinical_trial.molecule}
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
              value={meeting.patient.firstname}
              disabled
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={meeting.patient.lastname}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col col-2">Report :</div>
          <div className="col col-10 mb-3">
            <textarea
              className="form-control"
              id="report"
              rows="5"
              name="report"
              onChange={(e) => fillMeeting(e.target)}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
export default MeetingFormComponent;
