import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useAuth } from "./authen";
import BookingType from "../interfaces/BookingType";

const BookingsContext = createContext<BookingType[] | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookingsHistory, setBookingsHistory] = useState<BookingType[]>([]);
  const auth = useAuth();

  // console.log(bookingsHistory);

  useEffect(() => {
    const getBookingsHistory = async () => {
      const userId = auth.state.userData.id;
      try {
        const results = await axios(
          `http://localhost:4000/booking/user/${userId}`
        );

        setBookingsHistory(results.data.data);

        // console.log(bookingsHistory);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    getBookingsHistory();
  }, [auth.state.userData]);

  return (
    <BookingsContext.Provider value={{ bookingsHistory }}>
      {children}
    </BookingsContext.Provider>
  );
}

export default BookingsContext;
