export const TrainConfirmation: React.FC<{
  paxCount: number;
}> = (props) => {
  return (
    <div className="mt-2">
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
