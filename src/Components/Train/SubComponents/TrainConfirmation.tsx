export const TrainConfirmation: React.FC<{
  paxCount: number;
}> = (props) => {
  return (
    <div
      className="mt-2"
      style={{
        minHeight: "90px",
      }}
    >
      <div>
        <b>Seat Count: </b>
        {props.paxCount}
      </div>
      <div>
        <b>Passenger Details: </b>
        Passenger Detail will be shown here
      </div>
    </div>
  );
};
