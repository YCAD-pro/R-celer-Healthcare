import { useEffect, useState } from "react";
import MeetingsListComponent from "./meetingsList.component";

const MeetingDashboardComponent = () => {
  const [doc, setDoc] = useState({});
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/user/" + localStorage.username)
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => {
        data.doctor_id = localStorage.id;
        setDoc(data);
      });
  }, []);

  useEffect(() => {
    if (doc.doctor_id !== undefined) {
      fetch("http://localhost:3080/meeting/pending/" + doc.doctor_id)
        .then((resp) => resp.json())
        .catch((err) => console.error(err))
        .then((data) => {
          setMeetings(data);
        });
    }
  }, [doc]);

  const [comingMeeting, setComingMeeting] = useState([]);
  useEffect(() => {
    // map before...
    meetings.forEach((meeting) => {
      const list_meeting_id = comingMeeting.map(
        (meeting) => meeting.id_meeting
      );
      if (!list_meeting_id.includes(meeting.id_meeting)) {
        setComingMeeting((oldArray) => [...oldArray, meeting]);
      }
    });
  }, [meetings]);

  return (
    <div className="container">
      <h1>
        You're Meeting Dashboard (
        <code>
          {doc.lastname} - {doc.firstname}
        </code>
        )
      </h1>
      <MeetingsListComponent meetings={comingMeeting} />
      <hr />
    </div>
  );
};
export default MeetingDashboardComponent;
