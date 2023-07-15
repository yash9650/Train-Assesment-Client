import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TrainTicketQueue: React.FC = () => {
  const location = useLocation();

  const bookedSeats: number[] = location.state?.bookedSeats || [];
  const trainDetails: any = location.state?.trainDetails || {};

  return (
    <div className="container">
      <h2>Ticket-Queue</h2>
      {bookedSeats.length > 0 ? (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div>
                <h5 className="text-primary">{trainDetails?.trainName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Booked Seat Count:
                  <span className="text-success ms-2">
                    {" "}
                    {bookedSeats.length}{" "}
                  </span>
                </h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                <span className="fw-bold fs-6"> Seat Numbers: </span>
                {bookedSeats.map(
                  (seat, index) =>
                    `${seat}${index + 1 === bookedSeats.length ? "" : ", "}`
                )}
              </div>
              <div className="mt-2">
                <h6 className="text-secondary">Seat Details Pax wise: </h6>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Seat Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedSeats.map((seat, index) => (
                      <tr key={seat}>
                        <th scope="row">{index + 1}</th>
                        <td>Yash</td>
                        <td>Gupta</td>
                        <td>{seat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ) : (
        <div className="mt-2 text-danger">
          No Ticket Booked Yet. Please book a ticket first.
        </div>
      )}
    </div>
  );
};

export default TrainTicketQueue;
