import { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { TrainPassengerDetails } from "./TrainPassengerDetails";
import { TrainConfirmation } from "./TrainConfirmation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ActiveKey =
  | "seat-count-tab"
  | "passenger-details-tab"
  | "confirm-booking-tab";

export const TrainBookingModal: React.FC<{
  show: boolean;
  onHide: () => void;
  availableSeats: number;
  trainDetails: any;
}> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [seatCount, setSeatCount] = useState<string>("1");
  const [activeKey, setActiveKey] = useState<ActiveKey>("seat-count-tab");
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const navigate = useNavigate();

  const nextTabButton = (key: ActiveKey) => {
    return (
      <div
        className="mt-2 text-end text-primary"
        style={{
          cursor: "pointer",
        }}
      >
        <span
          onClick={() => {
            if (!seatCount) {
              return setErrorMessage("Please enter seat count");
            }
            if (validateSeatCount(seatCount)) {
              setActiveKey(key);
            }
          }}
        >
          Next &gt;&gt;
        </span>
      </div>
    );
  };

  const prevTabButton = (key: ActiveKey) => {
    return (
      <div
        className="mt-2 text-end text-primary"
        style={{
          cursor: "pointer",
        }}
      >
        <span
          onClick={() => {
            setActiveKey(key);
          }}
        >
          &lt;&lt; prev
        </span>
      </div>
    );
  };

  const validateSeatCount = (value: string) => {
    if (parseInt(value) <= 0 || parseInt(value) > 7) {
      setErrorMessage("Only 1 to 7 seats can be booked at a time");
      return false;
    }
    if (parseInt(value) > props.availableSeats) {
      setErrorMessage(`Only ${props.availableSeats} seats are available`);
      return false;
    }
    return true;
  };

  const bookTrain = () => {
    if (!seatCount || errorMessage) {
      return;
    }
    setIsBooking(true);
    fetch("/train/book-seats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trainId: props.trainDetails.id,
        seats: parseInt(seatCount),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success("Ticket booked successfully");
          const bookedSeats = data.result;
          setIsBooking(false);
          props.onHide();
          navigate("/ticket-queue", {
            state: {
              bookedSeats,
              trainDetails: props.trainDetails,
            },
          });
        } else {
          throw new Error(data.errorMessage);
        }
      })
      .catch((err) => {
        setIsBooking(false);
        toast.error(err.message);
      });
    // book ticket
  };

  return (
    <Modal onHide={props.onHide} show={props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Train</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container mb-4">
          <Tabs activeKey={activeKey}>
            <Tab title="Seat Count" eventKey="seat-count-tab">
              <div className="row mt-2">
                <div className="col-6">
                  <h5 className="card-title">Train Name</h5>
                </div>
                <div className="col-6 text-end">
                  <h6 className="card-subtitle mb-2 text-muted">
                    Available seats:{" "}
                    <span className="text-success">
                      {" "}
                      {props.availableSeats}{" "}
                    </span>
                  </h6>
                </div>
              </div>
              <div className="mt-2">
                <div>
                  <label htmlFor="seat-count">No. of seats</label>
                  <input
                    type="text"
                    pattern="^[0-9]*$"
                    id="seat-count"
                    className="form-control"
                    value={seatCount}
                    placeholder="Enter no. of seats"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.match(/^[0-9]*$/) === null) {
                        return;
                      }
                      const isValid = validateSeatCount(value);
                      setSeatCount(value);
                      if (isValid) {
                        setErrorMessage("");
                      }
                    }}
                  />
                  <small className="text-danger">{errorMessage}</small>
                </div>
              </div>
              {nextTabButton("passenger-details-tab")}
            </Tab>
            <Tab title="PassengerDetails" eventKey="passenger-details-tab">
              <TrainPassengerDetails paxCount={parseInt(seatCount)} />
              <div className="d-flex justify-content-between">
                {prevTabButton("seat-count-tab")}
                {nextTabButton("confirm-booking-tab")}
              </div>
            </Tab>
            <Tab title="Confirm Booking" eventKey="confirm-booking-tab">
              <TrainConfirmation paxCount={parseInt(seatCount)} />
              <div className="d-flex justify-content-between">
                {prevTabButton("passenger-details-tab")}
                <div className="confirm-booking">
                  <button
                    style={{
                      transform: "translateY(20%)",
                    }}
                    className="btn btn-sm btn-primary"
                    onClick={bookTrain}
                  >
                    {isBooking ? (
                      <span
                        style={{
                          margin: "0px 45.5px",
                        }}
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};
