import { useNavigate } from "react-router-dom";
import useFormattedPrice from "../../hooks/useFormattedPrice";

interface RoomDetailPageContentProps {
  roomType: string;
  bedType: string;
  description: string;
  area: string;
  price: number;
  promotionPrice: number;
  amenity: string[];
  person: number;
}

function RoomDetailPageContent({
  roomType,
  bedType,
  description,
  area,
  price,
  promotionPrice,
  amenity,
  person,
}: RoomDetailPageContentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-gray-200 pb-[222px] pt-[80px] text-gray-700">
      <div>
        <div className="w-[738px] flex flex-col gap-14 pb-20 border-b-2 border-indigo-500">
          <h1 className="text-green-800 text-headline2 text-left font-noto-serif-display">
            {roomType}
          </h1>
          <div className="justify-between items-start gap-14 inline-flex">
            <div className="flex flex-col items-start gap-14">
              <div className="w-96 text-left ">{description}</div>
              <div className="">
                <span>{person}</span>
                <span> Person</span>
                <span className="text-gray-500"> | </span>
                <span>{bedType}</span>
                <span className="text-gray-500"> | </span>
                <span>{area}</span>
                <span> sqm </span>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-36 h-36">
              <div className="">
                <div className=" text-md text-right font-extralight line-through">
                  THB {useFormattedPrice(price)}
                </div>
                <div className=" text-headline5 text-right text-black font-semibold">
                  THB {useFormattedPrice(promotionPrice)}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="btn Button border-orange-600"
                  onClick={() => {
                    const userInput = {
                      checkInDate: "",
                      checkOutDate: "",
                      room: 1,
                      person: 2,
                      night: 1,
                    };

                    // Convert the object to a JSON string before storing it
                    localStorage.setItem(
                      "userInput",
                      JSON.stringify(userInput)
                    );
                    navigate("/search#top");
                  }}
                >
                  Find room
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t-2 border-gray-300">
          <div className=" text-left text-xl text-black font-bold mb-6 mt-10">
            <p>Room Amenities</p>
          </div>
          <div className="">
            <ul
              className={` list-disc ml-6 grid grid-cols-1 gap-2 ${
                amenity.length > 8 ? "md:grid-cols-2" : "md:grid-cols-1"
              }`}
            >
              {amenity.map((item) => {
                return <li className="max-w-[300px]">{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageContent;
