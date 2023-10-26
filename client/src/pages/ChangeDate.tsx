import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import useFormattedDate from "../hooks/useFormattedDate";
import BookingType from "../interfaces/BookingType";
import RoomsProps from "../interfaces/RoomsProps";

function ChangeDate() {
  const color: string = "#A0ACC3";

  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#E76B39",
        light: "#E76B39",
        dark: "#E76B39",
      },

      MuiPickersDay: {
        day: {
          color: "#c44242",
        },
        daySelected: {
          backgroundColor: "#436E70",
        },
        dayDisabled: {
          color: "#436E70",
        },
        current: {
          color: "#436E70",
        },
      },
    },
  });

  const navigate = useNavigate();
  const { bookId } = useParams();

  const [bookingData, setBookingData] = useState({
    room_details: {
      room_id: "",
      room_type: "",
      room_images: [],
    },
    check_in: "",
    check_out: "",
    booking_date: "",
    room_avaliable_id: "",
    user_id: "",
    book_id: "",
    status: "",
    cancel_date: "",
  });

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [maxDate, setMaxDate] = useState();

  const [roomAvaliable, setRoomAvaliable] = useState();
  // console.log(roomAvaliable);

  const [checkInError, setCheckInError] = useState(false);

  const [checkUser, setCheckUser] = useState(null);

  const calculateCheckOutDate = (newCheckInDate: any) => {
    const originalCheckOutDate = dayjs(bookingData.check_out);
    const numberOfDays = originalCheckOutDate.diff(
      dayjs(bookingData.check_in),
      "day"
    );
    const newCheckOutDate = newCheckInDate.add(numberOfDays, "day");

    return newCheckOutDate;
  };

  const handleCheckInDateChange = (newValue: any) => {
    const newCheckOutDate = calculateCheckOutDate(newValue);
    setCheckOutDate(newCheckOutDate);
    setMaxDate(newCheckOutDate);
  };

  // ตรวจสอบว่าวันที่อยู่ในอาร์เรย์ roomAvaliable
  const shouldDisableDate = (date: any) => {
    const data = roomAvaliable.some(
      (booking: BookingType) =>
        date.isBetween(
          dayjs(booking.check_in),
          dayjs(booking.check_out),
          null,
          "[]"
        ) &&
        booking.book_id !== bookingData.book_id &&
        booking.status === null
    );
    return data;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );
      const data = response.data.data;
      setBookingData(data);
      setCheckInDate(data.check_in);
      setCheckOutDate(data.check_out);
      //@ts-ignore
      setMaxDate(dayjs(data.check_out));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRoomAvaliable = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/avaliable/${bookingData.room_avaliable_id}`
      );
      const data = response.data.data;
      setRoomAvaliable(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    const newCheckInDate = dayjs(checkInDate);
    const newCheckOutDate = dayjs(checkOutDate);

    const data = {
      check_in: newCheckInDate.format("YYYY-MM-DD"),
      check_out: newCheckOutDate.format("YYYY-MM-DD"),
    };

    try {
      await axios.put(
        `http://localhost:4000/booking/ChangeDate/${bookId}`,
        data
      );
      navigate(`/booking/user/${bookingData.user_id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleConfirmChange = () => {
    const newCheckInDate = dayjs(checkInDate);
    const newCheckOutDate = dayjs(checkOutDate);
    const newCancelDate = dayjs(bookingData.cancel_date);

    const isRoomBooked = roomAvaliable.some((room: BookingType) => {
      const roomCheckIn = dayjs(room.check_in);
      const roomCheckOut = dayjs(room.check_out);

      return (
        bookingData.book_id !== room.book_id &&
        newCheckInDate.isBefore(roomCheckOut) &&
        newCheckOutDate.isAfter(roomCheckIn)
      );
    });

    if (isRoomBooked) {
      if (newCancelDate) {
        setCheckInError(false);
        document.getElementById("my_modal_1").showModal();
      } else {
        console.log("Room is already booked for this period");
        setCheckInError(true);
      }
    } else {
      document.getElementById("my_modal_1").showModal();
    }
  };

  useEffect(() => {
    fetchData();
    fetchRoomAvaliable();
  }, [checkUser]);

  useEffect(() => {
    fetchRoomAvaliable();
  }, [bookingData]);

  //check user
  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //@ts-ignore
      const userDataFromToken = jwtDecode(token);
      const result = await axios.get(
        `http://localhost:4000/validUser/${userDataFromToken.user_id}`
      );
      //@ts-ignore
      setCheckUser(result);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-bg flex flex-col items-center pt-20 pb-28">
        <h1 className="mb-12 w-[1120px] font-noto-serif-display text-headline2 font-medium text-gray-900">
          Change Check-in
          <br></br>
          and Check-out Date
        </h1>
        <div className="w-[1120px] border-b-[1px] text-gray-700">
          <div className="flex flex-col gap-12 py-10">
            <div className="w-full flex justify-between">
              <div>
                <div>
                  <img
                    src={bookingData.room_details.room_images[0]}
                    alt="Room"
                    className="rounded w-[357px] h-[210px] object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="w-[715px]">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-headline4 text-black">
                      {bookingData.room_details
                        ? bookingData.room_details.room_type
                        : "Loading..."}
                    </h2>
                    <p className="text-gray-600 text-body1">
                      Booking date: {useFormattedDate(bookingData.booking_date)}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-1 ">
                    <p className="font-bold text-grey-800">Original Date</p>
                    <div>
                      <span>{useFormattedDate(bookingData.check_in)}</span>
                      <span className="px-2">-</span>
                      <span>{useFormattedDate(bookingData.check_out)}</span>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-white">
                    <p className="font-bold text-grey-800">Change Date</p>
                    <div className="flex mt-4">
                      <div className="form-control">
                        <label className="label py-0">
                          <span className="text-gray-900 text-body1">
                            Check In
                          </span>
                        </label>

                        <DemoContainer components={["DatePicker"]}>
                          <ThemeProvider theme={theme}>
                            <DatePicker
                              showDaysOutsideCurrentMonth
                              fixedWeekNumber={6}
                              defaultValue={dayjs()}
                              value={dayjs(checkInDate)}
                              format="dd, D MMM YYYY"
                              minDate={dayjs().add(1, "day")}
                              disablePast
                              shouldDisableDate={
                                roomAvaliable ? shouldDisableDate : undefined
                              }
                              onChange={(newValue: any) => {
                                setCheckInDate(newValue);
                                handleCheckInDateChange(newValue);
                              }}
                              slotProps={{ textField: { size: "medium" } }}
                              sx={{
                                "& input": {
                                  padding: "12px",
                                  width: "240px",
                                  fontFamily: "inter",
                                  color: "#2A2E3F",
                                },
                              }}
                            />
                          </ThemeProvider>
                        </DemoContainer>
                      </div>
                      <div className="flex items-end px-6 py-4">-</div>
                      <div className="form-control">
                        <label className="label py-0">
                          <span className="text-gray-900 text-body1">
                            Check Out
                          </span>
                        </label>

                        <DemoContainer components={["DatePicker"]}>
                          <ThemeProvider theme={theme}>
                            <DatePicker
                              showDaysOutsideCurrentMonth
                              fixedWeekNumber={6}
                              defaultValue={dayjs()}
                              value={dayjs(checkOutDate)}
                              format="dd, D MMM YYYY"
                              maxDate={maxDate}
                              minDate={dayjs(checkInDate).add(1, "day")}
                              disablePast
                              shouldDisableDate={
                                roomAvaliable ? shouldDisableDate : undefined
                              }
                              onChange={(newValue: any) =>
                                setCheckOutDate(newValue)
                              }
                              slotProps={{ textField: { size: "medium" } }}
                              sx={{
                                "& input": {
                                  padding: "12px",
                                  width: "240px",
                                  fontFamily: "inter",
                                  color: "#2A2E3F",
                                },
                              }}
                            />
                          </ThemeProvider>
                        </DemoContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between -ml-4 relative">
              <button
                onClick={() => navigate(`/booking/user/${bookingData.user_id}`)}
                className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
              >
                Cancel
              </button>
              {checkInError && (
                <p className="text-body2 text-red absolute -top-[40px] right-[440px]">
                  Room is already booked for this period
                </p>
              )}
              <div className="flex">
                <div>
                  <button
                    className="btn Button"
                    onClick={() => {
                      handleConfirmChange();
                    }}
                  >
                    Confirm Change Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-25 bg-gray-900 z-50">
          <div className="w-[631px] h-[200px] bg-white flex flex-col font-inter z-60 rounded-[4px]">
            <div className="flex justify-start items-center text-headline5 text-black pl-6 mt-3 mb-3 relative">
              Change Date
              <form className="absolute right-5" method="dialog">
                <button>
                  <IoCloseOutline />
                </button>
              </form>
            </div>
            <hr />
            <div className="pl-6 text-body1 text-gray-700 mt-4">
              Are you sure you want to change your check-in and check-out date?
            </div>

            <form method="dialog">
              <div className="flex justify-end space-x-3 mt-[30px] mr-5">
                <button className="w-[144px] h-[48px] text-orange-500 bg-white border border-orange-500 rounded-md hover:border-orange-400 hover:text-orange-400 active:border-orange-600 active:text-orange-600">
                  No, I don't
                </button>
                <button
                  className="w-[227px] h-[48px] bg-orange-600 text-white rounded-md hover:bg-orange-500 active:bg-orange-700"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Yes, I want to change
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <Footer />
    </div>
  );
}

export default ChangeDate;
