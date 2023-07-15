import { createContext } from "react";

const TicketContext = createContext<{
  ticket: any[];
  setTicket: (ticket: any) => void;
  resetContext: () => void;
}>({
  ticket: [],
  setTicket: (ticket: any) => {},
  resetContext: () => {},
});

export default TicketContext;
