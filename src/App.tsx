import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import TrainList from "./Components/Train/TrainList";
import { CustomNavbar } from "./Components/UI/CustomNavbar";
import TrainTicketQueue from "./Components/Train/TrainTicketQueue";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TicketContext from "./Context/TicketContext";
function App() {
  const [ticket, setTicket] = useState<any[]>([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomNavbar />,
      children: [
        {
          element: <TrainList />,
          index: true,
        },
        {
          path: "ticket-queue",
          element: <TrainTicketQueue />,
        },
      ],
    },
  ]);

  return (
    <React.Fragment>
      <TicketContext.Provider
        value={{
          ticket,
          setTicket: (ticket) => {
            setTicket((old) => {
              return [ticket, ...old];
            });
          },
          resetContext: () => {
            setTicket([]);
          },
        }}
      >
        <ToastContainer />
        <RouterProvider router={router} />
      </TicketContext.Provider>
    </React.Fragment>
  );
}

export default App;
