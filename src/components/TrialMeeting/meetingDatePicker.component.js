const MeetingDatePickerComponent = ({ fctDate }) => {
  return (
    <div className="col-6 mt-4">
      <label className="form-label" htmlFor="datePicker">
        Choose date :
      </label>
      <input
        id="datePicker"
        className="form-select"
        type="datetime-local"
        onChange={(e) => fctDate(e.target.value)}
      />
    </div>
  );
};
export default MeetingDatePickerComponent;
