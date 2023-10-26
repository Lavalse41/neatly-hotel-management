import RoomDetailsTableType from "../../interfaces/RoomDetailsTableType";
import SingleSlidebar from "./SingleSlidebar";

function RoomDetailPopup({
  roomImages,
  roomType,
  bedType,
  description,
  area,
  amenity,
  person,
  onClosePopup,
}: RoomDetailsTableType) {
  return (
    <div className="absolute bg-black bg-opacity-20 w-screen h-screen">
      <div className="w-screen h-screen" onClick={onClosePopup}></div>
      <div className="absolute m-auto left-0 right-0 top-40 to w-[800px] h-[577px] flex flex-col items-center bg-white rounded-lg drop-shadow-md">
        <div className="w-[100%] flex justify-between items-center h-[60px] pl-20 border-b-[1px] border-gray-300">
          <h2 className="text-black text-headline5">{roomType}</h2>
          <button onClick={onClosePopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M22 38L38 22M22 22L38 38"
                stroke="#C8CCDB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-scroll pl-20 pr-16 pt-4 pb-[60px]">
          {/* Photo Slide */}
          <SingleSlidebar roomImages={roomImages} />
          {/* description */}
          <div className="flex flex-col text-gray-700 text-body1 ">
            <div className="pb-4 pt-9 ">
              <span className="text-gray-800">{person}</span>
              <span> Person</span>
              <span className="px-4"> | </span>
              <span className="text-gray-800">{bedType}</span>
              <span className="px-4"> | </span>
              <span className="text-gray-800">{area}</span>
              <span> sqm</span>
            </div>
            <p className="pb-10">{description}</p>

            <div>
              <p className="text-black py-4 border-t-[1px] border-gray-300">
                Room Amenities
              </p>
              <ul className="columns-2 pl-6 list-disc break-inside-avoid-column">
                {amenity &&
                  amenity.map((item) => {
                    return <li className="max-w-[300px]">{item}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPopup;
