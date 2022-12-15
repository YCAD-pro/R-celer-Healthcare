import moment from "moment";

const TrialRowComponent = (props) => {
  return (
    <tr onClick={() => props.goTo(props.trial.trial_id)}>
      <th>{props.trial.trial_id}</th>
      <td>{props.trial.name}</td>
      <td>{props.trial.molecule}</td>
      <td>{moment(props.trial.startDate).format("DD-MM-YYYY")}</td>
      <td>{moment(props.trial.endDate).format("DD-MM-YYYY")}</td>
      <td>{props.trial.status}</td>
      <td>{props.trial.doc_length}</td>
      <td>{props.trial.patient_length}</td>
    </tr>
  );
};
export default TrialRowComponent;
