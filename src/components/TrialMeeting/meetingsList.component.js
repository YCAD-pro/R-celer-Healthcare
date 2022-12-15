import MeetingLineComponent from "./meetingLine.component";
import { useNavigate } from "react-router-dom";

const MeetingsListComponent = (props) => {
  const navigate = useNavigate();
  const generateList = () => {
    return props.meetings.map((meeting, index) => {
      return (
        <MeetingLineComponent
          key={index}
          idMeeting={meeting.id_meeting}
          patient={meeting.patient}
          date={meeting.date_meeting}
          trial={meeting.trial}
          btn={startTrial}
        />
      );
    });
  };

  const startTrial = (patient, date, trial, idMeeting) => {
    navigate("/populateMeeting", {
      state: {
        idMeeting: idMeeting,
        patient: patient,
        date: date,
        trial: trial,
      },
    });
  };
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Patient</th>
            <th>When</th>
            <th>Trial Name</th>
          </tr>
        </thead>
        <tbody>{generateList()}</tbody>
      </table>
    </div>
  );
};
export default MeetingsListComponent;
