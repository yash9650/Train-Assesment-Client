export const TrainPassengerDetails: React.FC<{
  paxCount: number;
}> = (props) => {
  const printPassengerDetailsInput = () => {
    const passengerDetailsInput = [];
    for (let i = 0; i < props.paxCount; i++) {
      passengerDetailsInput.push(
        <div className="col-md-6 col-12" key={`name-input-${i}`}>
          <label htmlFor={`name${i + 1}`}>Enter Passenger {i + 1} name:</label>
          <input
            type="text"
            id={`name${i + 1}`}
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      );
    }
    return passengerDetailsInput;
  };

  return (
    <div className="mt-2">
      <h6>Add Passenger Details(Optional):</h6>
      <div className="row">{printPassengerDetailsInput()}</div>
    </div>
  );
};
