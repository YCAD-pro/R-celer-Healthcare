import { useEffect, useState } from "react";
import MeetingsListComponent from "./meetingsList.component";

const MeetingDashboardComponent = () => {
  const [doc, setDoc] = useState({});
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    // TODO Change id doc default
    // load meetingDoc for this week
    // 1 meeting depuis cette vue represente (1 jour, 1 heure, 1 patient, un trial)
    // donc la vue est un tableau
    setDoc({
      doctor_id: 1,
      username: "ALEX",
      firstname: "Alexandra",
      lastname: "EBOLI",
    });
  }, []);

  useEffect(() => {
    if (doc.doctor_id !== undefined) {
      fetch("http://localhost:3080/meeting/doc/" + doc.doctor_id)
        .then((resp) => resp.json())
        .catch((err) => console.error(err))
        .then((data) => {
          setMeetings(data);
        });
    }
  }, [doc]);

  const [passedMeeting, setPassedMeeting] = useState([]);
  const [comingMeeting, setComingMeeting] = useState([]);
  const [futureMeeting, setFuturMeeting] = useState([]);
  useEffect(() => {
    const now = new Date();
    meetings.map((meeting) => {
      const date = new Date(meeting.date_meeting);

      if (date >= now) {
        if (date.getDay() === now.getDay()) {
          setFuturMeeting((oldArray) => [...oldArray, meeting]);
        } else {
          setComingMeeting((oldArray) => [...oldArray, meeting]);
        }
      } else {
        setPassedMeeting((oldArray) => [...oldArray, meeting]);
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
      <h3>This day :</h3>
      <MeetingsListComponent meetings={passedMeeting} />
      <hr />
      <h3>rest of the week :</h3>
      <MeetingsListComponent meetings={comingMeeting} />
      <hr />
      <h4>Passed :</h4>
      <MeetingsListComponent meetings={futureMeeting} />
    </div>
  );
};
export default MeetingDashboardComponent;
