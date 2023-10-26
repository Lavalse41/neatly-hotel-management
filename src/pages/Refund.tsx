import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";
import RefundSuccess from "../components/Refund/refundSuccess.tsx";
import useFormattedPrice from "./../hooks/useFormattedPrice";
import useFormattedDate from "../hooks/useFormattedDate";
import jwtDecode from "jwt-decode";

function Refund() {
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
    total_price_add_reqs: "",
    amount_stay: "",
    room_avaliable: {
      room_avaliable_id: "",
    },
    user_id: null,
    amount_room: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );

      const data = response.data.data;
      setCancelBooking(data);
      setCheckUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  const updateData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/booking/cancel/${bookId}`,
        { ...cancelBooking, refund: true }
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
      setCheckUser(result.data.user_id);
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
          <RefundSuccess />
        ) : (
          <>
            <h1 className="mt-20 mb-16 font-noto-serif-display font-medium text-[68px] leading-[85px] text-black">
              Request a Refund
            </h1>
            <div className="w-[1120px] border-b-[1px] text-gray-700">
              <div className="flex flex-col gap-12 py-10">
                <div className="w-full flex justify-between mb-2">
                  <div>
                    <div>
                      <img
                        src={cancelBooking.room_details.room_images[2]}
                        alt="Room"
                        className="rounded w-[357px] h-[210px] object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="w-[715px]">
                      <div className="flex flex-row justify-between items-center">
                        <h2 className="text-headline4 text-black">
                          {cancelBooking.room_details.room_type}
                        </h2>
                        <p className="text-gray-600 text-body1">
                          Booking date:{" "}
                          {useFormattedDate(cancelBooking.booking_date)}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <div className="mt-10 flex flex-col  text-gray-700 text-body1">
                          <div>
                            <div>
                              <span>
                                {useFormattedDate(cancelBooking.check_in)}
                              </span>
                              <span className="px-2">-</span>
                              <span>
                                {useFormattedDate(cancelBooking.check_out)}
                              </span>
                            </div>
                            <div className="mt-2">
                              <span>{cancelBooking.amount_stay} Guests</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right mt-8 flex flex-col">
                          <div>
                            <div>
                              <span className="text-body1 text-gray-900 ">
                                Total Refund
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className="text-headline5 text-gray-900">
                                THB{" "}
                                {useFormattedPrice(
                                  cancelBooking.total_price_add_reqs /
                                    cancelBooking.amount_room
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between -ml-4 pt-10 border-t-[2px] border-gray-300">
                  <button
                    onClick={() => navigate("/booking/user/${userId}")}
                    className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
                  >
                    Cancel
                  </button>
                  <div className="flex">
                    <div>
                      <button
                        className="btn Button mb-[400px]"
                        onClick={handleCancel}
                      >
                        Cancel and Refund this Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Refund;
