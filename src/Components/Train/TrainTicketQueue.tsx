import { Accordion } from "react-bootstrap";
import TicketContext from "../../Context/TicketContext";
import { useContext } from "react";

interface ITicketQueue {
  bookedSeats: number[];
  trainDetails: {
    trainName: string;
    [key: string]: any;
  };
}

const TrainTicketQueue: React.FC = () => {
  const { ticket } = useContext(TicketContext);

  return (
    <div className="container">
      <h2>Ticket-Queue</h2>
      {ticket.length > 0 ? (
        <Accordion defaultActiveKey="0">
          {ticket.map((ticket: ITicketQueue, index) => (
            <Accordion.Item className="mb-3" eventKey={index.toString()}>
              <Accordion.Header>
                <div>
                  <h5 className="text-primary">
                    {ticket.trainDetails.trainName}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Booked Seat Count:
                    <span className="text-success ms-2">
                      {" "}
                      {ticket.bookedSeats.length}{" "}
                    </span>
                  </h6>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <span className="fw-bold fs-6"> Seat Numbers: </span>
                  {ticket.bookedSeats.map(
                    (seat, index) =>
                      `${seat}${
                        index + 1 === ticket.bookedSeats.length ? "" : ", "
                      }`
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
                      {ticket.bookedSeats.map((seat, index) => (
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
          ))}
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
