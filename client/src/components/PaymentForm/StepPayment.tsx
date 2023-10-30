import ButtonPayment from "./ButtonPayment";
import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import ButtonNavigation from "./ButtonNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authen";
import StepPropsType from "../../interfaces/StepPropsType";

function StepPayment({
  steps,
  activeStep,
  setActiveStep,
  selectedPayment,
  setSelectedPayment,
  lastThreeCardNumber,
  setLastThreeCardNumber,
}: StepPropsType) {
  const auth = useAuth();

  const [payment, setPayment] = useState({
    card_number: "",
    expire_date: "",
    card_owner: "",
    cvc: "",
  });

  const getPaymentID = async () => {
    try {
      const response = await axios.get(
        `https://vercel.com/lavalse41/neatly-api/paymentmethod/${auth.state.userData.credit_card_id}`
      );
      // console.log(response.data.data);
      const data = response.data.data;

      const formattedCardNumber = data.card_number
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setPayment({
        ...data,
        card_number: formattedCardNumber,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPaymentID();
  }, [auth.state.userData.credit_card_id]);

  useEffect(() => {
    setLastThreeCardNumber(payment.card_number.slice(-3));
  }, [payment]);

  const creditButtonProps = {
    image:
      "M3.5 11H29.5M3.5 12H29.5M7.5 19H15.5M7.5 22H11.5M6.5 26H26.5C27.2957 26 28.0587 25.6839 28.6213 25.1213C29.1839 24.5587 29.5 23.7956 29.5 23V9C29.5 8.20435 29.1839 7.44129 28.6213 6.87868C28.0587 6.31607 27.2957 6 26.5 6H6.5C5.70435 6 4.94129 6.31607 4.37868 6.87868C3.81607 7.44129 3.5 8.20435 3.5 9V23C3.5 23.7956 3.81607 24.5587 4.37868 25.1213C4.94129 25.6839 5.70435 26 6.5 26Z",
    title: "Credit Card",
    isActive: selectedPayment === "credit",
    onClick: () => {
      setSelectedPayment("credit");
    },
  };

  const cashButtonProps = {
    image:
      "M3.33398 25C10.4481 24.9942 17.5313 25.9363 24.3967 27.8013C25.366 28.0653 26.334 27.3453 26.334 26.34V25M5.33398 6V7C5.33398 7.26522 5.22863 7.51957 5.04109 7.70711C4.85355 7.89464 4.5992 8 4.33398 8H3.33398M3.33398 8V7.5C3.33398 6.672 4.00598 6 4.83398 6H27.334M3.33398 8V20M27.334 6V7C27.334 7.552 27.782 8 28.334 8H29.334M27.334 6H27.834C28.662 6 29.334 6.672 29.334 7.5V20.5C29.334 21.328 28.662 22 27.834 22H27.334M29.334 20H28.334C28.0688 20 27.8144 20.1054 27.6269 20.2929C27.4393 20.4804 27.334 20.7348 27.334 21V22M27.334 22H5.33398M5.33398 22H4.83398C4.43616 22 4.05463 21.842 3.77332 21.5607C3.49202 21.2794 3.33398 20.8978 3.33398 20.5V20M5.33398 22V21C5.33398 20.7348 5.22863 20.4804 5.04109 20.2929C4.85355 20.1054 4.5992 20 4.33398 20H3.33398M20.334 14C20.334 15.0609 19.9126 16.0783 19.1624 16.8284C18.4123 17.5786 17.3949 18 16.334 18C15.2731 18 14.2557 17.5786 13.5056 16.8284C12.7554 16.0783 12.334 15.0609 12.334 14C12.334 12.9391 12.7554 11.9217 13.5056 11.1716C14.2557 10.4214 15.2731 10 16.334 10C17.3949 10 18.4123 10.4214 19.1624 11.1716C19.9126 11.9217 20.334 12.9391 20.334 14V14ZM24.334 14H24.3447V14.0107H24.334V14ZM8.33398 14H8.34465V14.0107H8.33398V14Z",
    title: "Cash",
    isActive: selectedPayment === "cash",
    onClick: () => {
      setSelectedPayment("cash");
    },
  };

  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white rounded border border-gray-300 p-10">
        <div className="flex gap-4 justify-center">
          <ButtonPayment {...creditButtonProps} />
          <ButtonPayment {...cashButtonProps} />
        </div>

        {selectedPayment === "credit" && (
          <form>
            <p className="text-headline5 mt-[58px] mb-[38px] text-gray-600">
              Credit Card
            </p>

            <div>
              <label htmlFor="cardNumber">
                <p className="font-body1 text-gray-900 mb-[4px]">Card Number</p>
              </label>
              <input
                id="cardNumber"
                type="text"
                name="card_number"
                className="w-full InputSuccess mb-[38px]"
                disabled
                value={payment.card_number}
              />
            </div>
            <div>
              <label htmlFor="cardOwner">
                <p className="font-body1 text-gray-900 mb-[4px]">Card Owner</p>
              </label>
              <input
                id="cardOwner"
                type="text"
                name="card_owner"
                className="w-full InputSuccess mb-[38px]"
                disabled
                value={payment.card_owner}
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label htmlFor="expire_date">
                  <p className="font-body1 text-gray-900 mb-[4px]">
                    Expiry Date
                  </p>
                </label>
                <input
                  id="expire_date"
                  type="tel"
                  name="expire_date"
                  className="w-full InputSuccess mb-[38px]"
                  disabled
                  value={payment.expire_date}
                />
              </div>

              <div>
                <label htmlFor="cvc">
                  <p className="font-body1 text-gray-900 mb-[4px]">CVC/CVV</p>
                </label>
                <input
                  id="cvc"
                  type="tel"
                  name="cvc"
                  className="w-full InputSuccess mb-[38px]"
                  disabled
                  value={payment.cvc}
                />
              </div>
            </div>
          </form>
        )}

        {selectedPayment === "cash" && (
          <div className="bg-gray-300 rounded flex flex-col justify-center items-center m-16 p-[32px]">
            <img
              alt="cash"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/cash.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Nhc2guc3ZnIiwiaWF0IjoxNjk0NTkwNjAxLCJleHAiOjE3MjYxMjY2MDF9.NCT-YH7AyMJmZTVHCmaB_uw7V4nPcnX1UR-zLpq0pk8&t=2023-09-13T07%3A36%3A42.086Z"
              className="w-32"
            />
            <p className="text-green-600 text-center">
              If you want to pay by cash,
              <br />
              you are required to make a cash payment
              <br />
              upon arrival at the Neatly Hotel.
              <br />
            </p>
            <img
              className="h-14 pt-2"
              alt="logo"
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20color.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyBjb2xvci5zdmciLCJpYXQiOjE2OTM1NTQ1NzgsImV4cCI6MTcyNTA5MDU3OH0.XvlMNW7d055OdT9qXJ5FFOGAOm6r_Kz3stsZXlfV0e8&t=2023-09-01T07%3A49%3A37.938ZLogo"
            />
          </div>
        )}
        <ButtonNavigation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
          selectedPayment={selectedPayment}
          lastThreeCardNumber={lastThreeCardNumber}
        />
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default StepPayment;
