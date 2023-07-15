import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import TrainList from "./Components/Train/TrainList";
import { CustomNavbar } from "./Components/UI/CustomNavbar";
import TrainTicketQueue from "./Components/Train/TrainTicketQueue";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
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
      <ToastContainer />
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
