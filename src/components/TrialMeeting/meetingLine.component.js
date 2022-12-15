import moment from "moment";

const MeetingLineComponent = (props) => {
  return (
    <tr>
      <td>
        {props.patient.firstname} {props.patient.lastname}
      </td>
      <td>
        {moment(props.date).format("DD-MM to HH:mm")} ({moment().to(props.date)}
        )
      </td>
      <td>{props.trial.name}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() =>
            props.btn(props.patient, props.date, props.trial, props.idMeeting)
          }
        >
          Begin
        </button>
      </td>
    </tr>
  );
};
export default MeetingLineComponent;
