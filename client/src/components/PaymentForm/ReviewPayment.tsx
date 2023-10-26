import { Link } from "react-router-dom";
import { useContext } from "react";
import { RoomsContext } from "../../App.tsx";
import { PaymentContext } from "../../pages/Payment.tsx";
import { useAuth } from "../../contexts/authen.jsx";
import { useNavigate } from "react-router-dom";
import useFormattedPrice from "../../hooks/useFormattedPrice.tsx";
import { StandardType, SpecialType } from "../../interfaces/RequestType.ts";

interface ReviewPaymentProps {
  selectedPayment: string;
  lastThreeCardNumber: string;
}

function ReviewPayment({
  selectedPayment,
  lastThreeCardNumber,
}: ReviewPaymentProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  const roomsContext = useContext(RoomsContext);
  const userInput = roomsContext.userInput;
  const paymentContext = useContext(PaymentContext);
  const selectedStandard = paymentContext.selectedStandard;
  const selectedSpecial = paymentContext.selectedSpecial;
  const checkInDate = paymentContext.checkInDate;
  const checkOutDate = paymentContext.checkOutDate;
  const totalPriceAfterAddReqs = paymentContext.totalPriceAfterAddReqs;
  const checkInTime = paymentContext.checkInTime;
  const checkOutTime = paymentContext.checkOutTime;
  const additional = paymentContext.additional;

  // console.log(userInput);

  return (
    <div className="w-[738px] flex flex-col">
      {/* Header */}
      <div className="bg-green-800 px-6 py-10 rounded-t text-center">
        <p className="font-noto-serif-display text-white text-[44px] font-medium">
          Thank you for booking
        </p>
        <p className="text-body2 text-green-400 text-center px-16 mt-2">
          We are looking forward to hosting you at our place. <br />
          We will send you more information about check-in and staying at our
          Neatly closer to your date of reservation
        </p>
      </div>
      {/* body */}
      <div className="bg-green-700 flex flex-col rounded-b px-10 pb-10">
        <div className="bg-green-600 flex justify-between rounded mt-6 p-5 text-white">
          <div>
            <div className="flex">
              <p className="text-white text-base font-semibold">
                {checkInDate}
              </p>
              <span className="px-2 text-body1">-</span>
              <p className="text-white text-base font-semibold">
                {checkOutDate}
              </p>
            </div>
            <div className="flex pt-2">
              <div className="pr-3 border-r-2 border-green-800">
                <span>{userInput.person}</span>
                <span className="pl-2">
                  {userInput.person > 1 ? `Guests` : `Guest`}
                </span>
              </div>
              <div className="px-3 border-r-2 border-green-800">
                <span>{userInput.room}</span>
                <span className="pl-2">
                  {userInput.room > 1 ? `Rooms` : `Room`}
                </span>
              </div>
              <div className="px-3">
                {userInput.night}
                <span className="pl-2">
                  {userInput.night > 1 ? `Nights` : `Night`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-white text-base font-semibold">Check-in</p>
              <p className="text-white text-body1 mt-2">{checkInTime}</p>
            </div>
            <div>
              <p className="text-white text-base font-semibold">Check-out</p>
              <p className="text-white text-body1 mt-2">{checkOutTime}</p>
            </div>
          </div>
        </div>

        <div className="text-green-300 text-body1">
          <div className="py-10 text-right">
            {selectedPayment === "credit" ? (
              <>
                <span>Payment success via</span>
                <span className="text-white text-base font-semibold pl-4">
                  Credit Card - *{lastThreeCardNumber}
                </span>
              </>
            ) : (
              <span>Payment on arrival</span>
            )}
          </div>

          {/* room_type */}
          <div className="mb-2">
            <div>{userInput.roomType}</div>
            <div className="flex justify-between py-1">
              <div>
                (<span className="pl-1">{userInput.room}</span>
                <span className="pl-2">
                  {userInput.room > 1 ? `rooms` : `room`}
                </span>
                <span className="px-2">x</span>
                {userInput.night}
                <span className="pl-2 pr-1">
                  {userInput.night > 1 ? `nights` : `night`}
                </span>
                )
              </div>
              <p className="text-white text-base font-semibold">
                {useFormattedPrice(userInput.totalPrice)}
              </p>
            </div>
          </div>

          {/* standard request */}
          {selectedStandard.map((request: StandardType) => {
            return (
              <div className="flex py-3">
                <p>{request.name}</p>
              </div>
            );
          })}
          {/* special request */}
          {selectedSpecial.map((request: SpecialType) => {
            return (
              <div className="flex justify-between py-3">
                <div>
                  {userInput.room}
                  <span className="px-2">x</span>
                  <span>{request.name}</span>
                </div>
                <p className="text-white text-base font-semibold">
                  {useFormattedPrice(request.price)}
                </p>
              </div>
            );
          })}
          <div className="flex flex-col justify-between w-full py-4">
            <p className="text-body1 font-semibold">Additional Request</p>
            <p className=" text-body1 pt-2 text-white">
              {additional ? additional : "No additional Request"}
            </p>
          </div>

          <hr className="border-t-2 border-green-600 mt-4" />

          <div className="flex justify-between pt-6">
            <p>Total</p>
            <p className="text-white text-headline5">
              THB {useFormattedPrice(totalPriceAfterAddReqs)}
            </p>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex gap-10 pt-14 justify-center items-center">
        {/* <Link to={`/booking/user/${auth.state.userData.id}`}> */}
        <button
          className="text-orange-500 text-base font-semibold"
          onClick={() => {
            navigate(`/booking/user/${auth.state.userData.id}`);
            // window.location.reload();
          }}
        >
          Check Booking Detail
        </button>
        {/* </Link> */}
        <Link to="/">
          <button className="Button px-8 py-4 w-48">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ReviewPayment;
