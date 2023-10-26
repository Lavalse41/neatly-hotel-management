import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";
import CancelSuccess from "../components/CancelBooking/CancelSuccess.tsx";
import useFormattedDate from "./../hooks/useFormattedDate";
import jwtDecode from "jwt-decode";

function CancelBooking() {
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [checkUser, setCheckUser] = useState(null);

  const [cancelBooking, setCancelBooking] = useState({
    room_details: {
      room_images: [],
      room_type: "",
    },
    booking_date: "",
    check_in: "",
    check_out: "",
    amount_stay: "",
    room_avaliable: {
      room_avaliable_id: "",
    },
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

  const updateData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/booking/cancel/${bookId}`,
        { ...cancelBooking }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    await updateData();
    setComplete(true);
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
    <div className="flex flex-col items-center w-screen bg-bg">
      <Navbar />

      <div className="flex flex-col w-[1120px]">
        {complete ? (
          <CancelSuccess />
        ) : (
          <div className="flex flex-col w-[1120px]">
            <h1 className="mt-20 mb-16 font-noto-serif-display font-medium text-[68px] leading-[85px] text-black">
              Cancel Booking
            </h1>
            <div className=" mt-10 mb-12">
              <div className="flex flex-row justify-between ">
                <div>
                  <img
                    src={cancelBooking.room_details.room_images[2]}
                    alt="Room"
                    className="rounded w-[357px] h-[210px] object-cover"
                  />
                </div>

                <div className="w-[715px]">
                  <div className="flex flex-row justify-between items-center mb-10">
                    <h2 className="text-headline4 text-black">
                      {cancelBooking.room_details.room_type}
                    </h2>
                    <p className="text-gray-600 text-body1">
                      Booking date:{" "}
                      {useFormattedDate(cancelBooking.booking_date)}
                    </p>
                  </div>

                  <div className="flex flex-col mb-8 text-gray-700 text-body1">
                    <div>
                      <div>
                        <span>{useFormattedDate(cancelBooking.check_in)}</span>
                        <span className="px-2">-</span>
                        <span>{useFormattedDate(cancelBooking.check_out)}</span>
                      </div>
                      <div className="mt-2">
                        <span>{cancelBooking.amount_stay} Guests</span>
                      </div>
                    </div>
                  </div>
                  <div className=" text-body3 text-[#B61515]">
                    *Cancellation of the booking now will not be able to request
                    a refund.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 border-t-[2px] border-gray-300 " />
            <div className="flex flex-row mt-12 justify-between mb-[400px]">
              <button
                className="btn capitalize   bg-bg border-none font-semibold text-[16px] leading-4 text-orange-500 hover:bg-bg"
                onClick={() => navigate("/booking/user/${userId}")}
              >
                Cancel
              </button>
              <button className="btn Button " onClick={handleCancel}>
                Cancel this Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CancelBooking;
