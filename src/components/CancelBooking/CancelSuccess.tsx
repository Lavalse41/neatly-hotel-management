import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import useFormattedDate from "../../hooks/useFormattedDate";
import jwtDecode from "jwt-decode";

function CancelSuccess() {
  const { bookId } = useParams();
  const [checkUser, setCheckUser] = useState(null);
  const navigate = useNavigate();

  const [cancelBooking, setCancelBooking] = useState({
    room_details: {
      room_images: [],
      room_type: "",
    },
    booking_date: "",
    check_in: "",
    check_out: "",
    cancel_date: "",
    amount_stay: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setCancelBooking(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [bookId]);

  //check user
  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      const result = await axios.get(
        `http://localhost:4000/validUser/${userDataFromToken.user_id}`
      );
      setCheckUser(result);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <div className="flex flex-col items-center  bg-bg">
      {/* Header */}
      <div className="flex flex-col justify-center bg-green-800 rounded-t  w-[738px] h-[189px] mt-[80px] text-center">
        <p className="font-noto-serif-display text-white text-[44px] font-medium">
          The Cancellation is Complete
        </p>
        <p className="text-body2 text-green-400 text-center pt-4 px-16">
          The cancellation is complete. <br />
          You will recieve an email with a detail and refund within 48 hours.
        </p>
      </div>
      {/* body */}
      <div className="flex flex-col justify-center items-center rounded-b w-[738px] h-[318px] mb-[60px] bg-green-700 ">
        <div className="flex flex-col rounded w-[658px] h-[254px] bg-green-600 p-6">
          <p className="text-white  text-headline5">
            {cancelBooking.room_details.room_type}
          </p>
          <div className="flex flex-row pb-1 text-white  mt-4">
            <p className=" text-base font-semibold">
              {useFormattedDate(cancelBooking.check_in)}
            </p>
            <span className="px-2 text-body1">-</span>
            <p className=" text-base font-semibold">
              {useFormattedDate(cancelBooking.check_out)}
            </p>
          </div>
          <p className="text-white text-body1 py-1 ">
            {cancelBooking.amount_stay} Guests
          </p>
          <div className="flex flex-col text-body1 text-green-300 mt-10">
            <p className=" py-1 ">
              Booking date: {useFormattedDate(cancelBooking.booking_date)}
            </p>
            <p className=" py-1 ">
              Cancellation date: {useFormattedDate(cancelBooking.cancel_date)}
            </p>
          </div>
        </div>
      </div>

      {/* Button */}

      <Link to="/">
        <button className="btn Button  w-[180px] h-[48px] mb-[330px]">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
export default CancelSuccess;
