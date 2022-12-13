import MeetingLineComponent from "./meetingLine.component";

const MeetingsListComponent = (props) => {
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

  const startTrial = (meetingId) => {
    console.log("to start " + meetingId);
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
