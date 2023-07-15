import { useEffect, useState } from "react";
import { TrainBookingModal } from "./SubComponents/TrainBookingModal";
import { toast } from "react-toastify";

const TrainList: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [trains, setTrains] = useState<any[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<any>({});
  const [isLoadingTrain, setIsLoadingTrain] = useState<boolean>(false);

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
            <div className="col-6 text-end">
              <button
                className="btn btn-info"
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
      {isLoadingTrain && (
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
      )}

      {printTrainList()}
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
