import moment from "moment";

const TrialLineComponent = ({ trial }) => {
  return (
    <div className="form-control mt-2">
      <div className="row mt-2">
        <div className="col-4">
          <div className="form-label">
            Name :{" "}
            <span className="text-center text-primary">{trial.name}</span>
          </div>
          <div className="form-label">
            Molecule : <span>{trial.molecule}</span>
          </div>
        </div>
        <div className="col-3">
          <div className="form-label">
            Start : <code>{moment(trial.start_date).format("DD/MM/YYYY")}</code>
          </div>
          <div className="form-label">
            End : <code>{moment(trial.end_date).format("DD/MM/YYYY")}</code>
          </div>
        </div>
        <div className="col-2">
          <div className="form-label">Description :</div>
          <div className="form-label">
            <code>{trial.description}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrialLineComponent;
