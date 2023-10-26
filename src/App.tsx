import "./App.css";
import React from "react";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import Payment from "./pages/Payment.tsx";
import Profile from "./pages/Profile.tsx";
import PaymentMethod from "./pages/PaymentMethod.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import NotFound from "./pages/NotFound.tsx";
import ChangeDate from "./pages/ChangeDate.tsx";
import Refund from "./pages/Refund.tsx";
import CancleBooking from "./pages/CancelBooking.tsx";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { RoomsProps } from "./interfaces/RoomsProps.tsx";
import BookingHistory from "./pages/BookingHistory.tsx";
import { BookingsProvider } from "./contexts/BookingContext.jsx";
import Admin from "./pages/Admin.tsx";
import CustomerBooking from "./components/Admin/CustomerBooking.tsx";
import RoomManagement from "./components/Admin/RoomManagement.tsx";
import RoomAndProperty from "./components/Admin/RoomAndProperty.tsx";
import jwtDecode from "jwt-decode";

export const RoomsContext = React.createContext();

const onlyAdminRoutes = [
  {
    path: "/",
    element: <Admin />,
    children: [
      {
        path: "/", // This corresponds to / in the parent route
        element: <CustomerBooking />,
      },
      {
        path: "/RoomManagement",
        element: <RoomManagement />,
      },
      {
        path: "/RoomAndProperty",
        element: <RoomAndProperty />,
      },
    ],
  },
];
function App() {
  const [rooms, setRooms] = useState<RoomsProps[]>([]);
  const [roomResult, setRoomResult] = useState<RoomsProps[]>([]);
  const [userInput, setUserInput] = useState<RoomsProps | null>(null);
  const [validateRole, setValidateRole] = useState("user");

  const getRooms = async () => {
    const results = await axios(`http://localhost:4000/room`);
    setRooms(results.data.data);
  };

  const handleSearchResult = async (result) => {
    try {
      const results = await axios.get(
        `http://localhost:4000/avaliable?checkInDate=${result.checkInDate}&checkOutDate=${result.checkOutDate}`
      );
      console.log(results.data);
      setRooms(results.data);
      const roomCounts = {};

      // Count the occurrences of each room_id in the results
      results.data.forEach((roomAvaliable) => {
        const { room_id } = roomAvaliable;
        roomCounts[room_id] = (roomCounts[room_id] || 0) + 1;
      });

      // Update the available counts for each room
      const updatedRooms = rooms.map((room) => {
        const roomId = room.room_id;
        room.available = roomCounts[roomId] || 0;
        return room;
      });
      // Set the updated rooms state
      setRooms(updatedRooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const storedUserInput = localStorage.getItem("userInput");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (storedUserInput && role) {
      setUserInput(JSON.parse(storedUserInput));
    }
    if (token && role) {
      setValidateRole(role);
    }
    // Fetch rooms
    getRooms();
  }, []);

  const userRoutes = (
    <>
      <RoomsContext.Provider
        value={{
          rooms,
          userInput,
          setUserInput,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUserInput={setUserInput}
                onSearchResult={handleSearchResult}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
          <Route
            path="/search"
            element={
              <SearchResult
                roomResult={roomResult}
                userInput={userInput}
                setUserInput={setUserInput}
                onSearchResult={handleSearchResult}
                setRoomResult={setRoomResult}
              />
            }
          />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/paymentmethod/:paymentmethodID"
            element={<PaymentMethod />}
          />
          <Route path="/profile/:profileID" element={<Profile />} />
          <Route path="/booking/user/:userId" element={<BookingHistory />} />
          <Route path="/changeDate/:bookId" element={<ChangeDate />} />
          <Route path="/refund/:bookId" element={<Refund />} />
          <Route path="/cancleBooking/:bookId" element={<CancleBooking />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </RoomsContext.Provider>
    </>
  );

  const adminRoutes = (
    <>
      {/* <Routes>
        {onlyAdminRoutes.map(({ path, sidebar }) => (
          <Route key={path} path={path} element={sidebar} />
        ))}
      </Routes>
      <Routes>
        {onlyAdminRoutes.map(({ path, mainContent }) => (
          <Route key={path} path={path} element={mainContent} />
        ))}
      </Routes> */}

      <Routes>
      <Route path="/login" element={<Login />} />
        {onlyAdminRoutes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children &&
              children.map(({ path: childPath, element: childElement }) => (
                <Route
                  key={childPath}
                  path={childPath}
                  element={childElement}
                />
              ))}
          </Route>
        ))}
        
      </Routes>
      {/* <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route
            path="/admin/customerBooking"
            element={[<Admin />, <CustomerBooking />]}
          />
          <Route
            path="/admin/RoomManagement"
            element={[<Admin />, <RoomManagement />]}
          />
          <Route
            path="/admin/RoomAndProperty"
            element={[<Admin />, <RoomAndProperty />]}
          />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes> */}
    </>
  );

  return (
    <BookingsProvider>
      {validateRole === "user" ? userRoutes : null}
      {validateRole === "admin" ? adminRoutes : null}
    </BookingsProvider>
  );
}

export default App;
