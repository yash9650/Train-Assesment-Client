import { useContext, useEffect, useState } from "react";
import { TrainBookingModal } from "./SubComponents/TrainBookingModal";
import { toast } from "react-toastify";
import TicketContext from "../../Context/TicketContext";

const TrainList: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [trains, setTrains] = useState<any[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<any>({});
  const [isLoadingTrain, setIsLoadingTrain] = useState<boolean>(false);
  const [isResetingSeats, setIsResetingSeats] = useState<boolean>(false);

  const { resetContext } = useContext(TicketContext);

  useEffect(() => {
    getTrainList();
  }, []);

  const getTrainList = () => {
    setIsLoadingTrain(true);
    fetch("/train/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setIsLoadingTrain(false);
          setTrains(data.result);
        } else {
          throw new Error(data.errorMessage);
        }
      })
      .catch((err) => {
        setIsLoadingTrain(false);
        toast.error(err.message);
      });
  };

  const reset = () => {
    if (!window.confirm("Are you sure you want to reset all seats?")) {
      return;
    }
    setIsResetingSeats(true);
    fetch("/train/reset-seats")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setIsResetingSeats(false);
          toast.success(data.result);
          resetContext();
          getTrainList();
        } else {
          throw new Error(data.errorMessage);
        }
      })
      .catch((err) => {
        setIsResetingSeats(false);
        toast.error(err.message);
      });
  };

  const printTrainList = () => {
    return trains.map((train) => (
      <div className="card" key={train.id}>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h5 className="card-title">{train.trainName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Available seats:{" "}
                <span className="text-success">
                  {" "}
                  {train.seatsAvailableCount}{" "}
                </span>
              </h6>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <div className="me-2 text-center pe-2 border-end">
                <div>{train.fromStation}</div>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </div>
                <div>{train.toStation}</div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      setSelectedTrain(train);
                      setShowBookingModal(true);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h2>Train List</h2>
      <div className="row g-3 my-3">
        <div className="col-xl-10 col-md-9 col-sm-8 col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter train name"
          />
        </div>
        <div className="col-xl-2 col-md-3 col-sm-4 col-6">
          <div className="d-flex justify-content-end">
            <div className="me-2">
              <select className="form-select form-select-sm py-2">
                <option value="" className="">
                  Any Status
                </option>
                <option value="all">ALL</option>
                <option value="available">Available</option>
              </select>
            </div>
            <button className="btn btn-secondary btn-sm">Search</button>
          </div>
        </div>
      </div>
      <div className="col-12 text-end mb-2">
        <button className="btn btn-sm btn-danger" onClick={reset}>
          {isResetingSeats ? (
            <span
              style={{
                margin: "0px 34px",
              }}
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Reset Seats"
          )}
        </button>
      </div>
      {isLoadingTrain ? (
        <div>
          <p className="placeholder-glow">
            <span
              className="placeholder col-12"
              style={{
                minHeight: "90px",
              }}
            ></span>
          </p>

          <p className="placeholder-wave">
            <span
              className="placeholder col-12"
              style={{
                minHeight: "90px",
              }}
            ></span>
          </p>
        </div>
      ) : (
        printTrainList()
      )}
      {showBookingModal && (
        <TrainBookingModal
          show={showBookingModal}
          onHide={() => {
            setShowBookingModal(false);
            setSelectedTrain({});
          }}
          availableSeats={selectedTrain.seatsAvailableCount}
          trainDetails={selectedTrain}
        />
      )}
    </div>
  );
};

export default TrainList;
