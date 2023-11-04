import { useEffect, useState } from "react";
import useFormattedPrice from "../../hooks/useFormattedPrice";
import axios from "axios";

function PriceDetails({ bookId }: { bookId: number | null }) {
  const [priceDetail, setPriceDetail] = useState({
    room_details: {
      room_type: "",
      price: "",
    },
    total_price_add_reqs: "",
    special_request: [],
    amount_room: 0,
    amount_night: "",
    standard_request: "",
    payment_method: "",
    three_credit_card_num: "",
    total_price: "",
  });

  // console.log(priceDetail.special_request);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://neatly-dj6ygctp8-lavalse41.vercel.app/booking/${bookId}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setPriceDetail(data);
      data.total_price = parseFloat(data.total_price);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [bookId]);

  const specialRequestPrice = (req: string) => {
    switch (req) {
      case "Baby cot":
        return 400;
      case "Airport transfer":
        return 200;
      case "Extra bed":
        return 500;
      case "Extra pillows":
        return 100;
      case "Phone chargers and adapters":
        return 100;
      case "Breakfast":
        return 150;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col rounded items-center mb-[38px] pb-1 w-[920px]  bg-gray-100">
      <div className="flex flex-col justify-center items-center w-[872px]">
        <div className="flex flex-row w-[872px]  justify-end mt-3.5 pb-4 text-gray-600 ">
          {priceDetail.payment_method === "credit" ? (
            <>
              <p className="text-body1 mr-4">Payment success via</p>
              <span className="font-semibold text-[16px] leading-6">
                Credit Card - *{priceDetail.three_credit_card_num}
              </span>
            </>
          ) : (
            <p className="text-body1">Payment on arrival</p>
          )}
        </div>
        <div className="flex flex-col  w-[872px] text-gray-900">
          <div className="flex flex-row justify-between py-3  ">
            <p className="text-body1">
              {priceDetail.room_details.room_type} Room
            </p>
            <p className="text-body1 font-semibold ">
              {useFormattedPrice(priceDetail.total_price)}
            </p>
          </div>
          {Array.isArray(priceDetail.special_request) &&
            priceDetail.special_request.map((item, index) => {
              const specialRequestPriceNumber = specialRequestPrice(item);
              return (
                <div
                  className="flex flex-row justify-between  py-3"
                  key={index}
                >
                  <p className="text-body1">{item}</p>
                  <p className="text-body1 font-semibold  ">
                    {useFormattedPrice(
                      specialRequestPriceNumber * priceDetail.amount_room
                    )}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-between items-end mt-3 mb-4 text-gray-900 border-t border-gray-300 w-[872px] h-[54px]">
          <p>Total</p>
          <p className="text-body1 font-bold">
            THB {useFormattedPrice(priceDetail.total_price_add_reqs)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
