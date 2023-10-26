import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import RoomResultCard from "../components/SearchResult/RoomResultCard";
import RoomDetailPopup from "../components/SearchResult/RoomDetailPopup";
import Search from "../components/Search";
import Footer from "../components/Footer";
import ImageFullPopup from "../components/SearchResult/ImageFullPopup.tsx";
import { RoomsContext } from "../App.tsx";
import RoomsProps from "../interfaces/RoomsProps.tsx";
import UserInputType from "../interfaces/UserInputType.ts";
import RoomDetailsTableType from "../interfaces/RoomDetailsTableType.ts";

interface SearchResultProps {
  roomResult: RoomsProps[];
  userInput: UserInputType;
  setUserInput: (result: UserInputType) => void;
  onSearchResult: (result: UserInputType) => void;
  setRoomResult: (result: RoomsProps[]) => void;
}

function SearchResult({
  roomResult,
  userInput,
  setUserInput,
  onSearchResult,
  setRoomResult,
}: SearchResultProps) {
  const context = useContext(RoomsContext);
  const seachResultBtn = "Button-search-result";
  const [showRoomDetail, setShowRoomDetail] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomsProps | null>(null);

  useEffect(() => {
    if (userInput) {
      setRoomResult(context.rooms);
    }
  }, []);

  /*render all room cards*/
  useEffect(() => {
    if (userInput === null) {
      setRoomResult(context.rooms);
    }
  }, [context.rooms, setRoomResult]);

  // const location = useLocation();

  /*show room detail of selected card*/
  function handleRoomDetail(roomId: number) {
    const room = context.rooms.find((room) => room.room_id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowRoomDetail(true);
    }
  }

  /*show full image of selected card*/
  function handleFullImage(roomId: number) {
    const room = context.rooms.find((room) => room.room_id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowFullImage(true);
    }
  }

  /*close full image and room detail*/
  function handleClosePopup() {
    setShowRoomDetail(false);
    setShowFullImage(false);
  }

  return (
    <>
      {showFullImage && (
        <div className="fixed z-50 top-0 flex justify-center">
          <ImageFullPopup
            roomImages={selectedRoom.room_images}
            onClosePopup={handleClosePopup}
          />
        </div>
      )}
      {showRoomDetail && (
        <div className="sticky z-50 top-0 flex justify-center">
          <RoomDetailPopup
            roomId={selectedRoom.room_id}
            roomType={selectedRoom.room_type}
            roomImages={selectedRoom.room_images}
            bedType={selectedRoom.bed_types}
            description={selectedRoom.description}
            area={selectedRoom.area}
            price={selectedRoom.price}
            promotionPrice={selectedRoom.promotion_price}
            amenity={selectedRoom.amenity}
            person={selectedRoom.person}
            available={selectedRoom.available}
            onClosePopup={handleClosePopup}
          />
        </div>
      )}

      <Navbar />

      <div className="flex justify-center items-end bg-white py-10 px-[220px] drop-shadow-md border-t-[1px] border-gray-300">
        <Search
          seachResultBtn={seachResultBtn}
          setUserInput={setUserInput}
          onSearchResult={onSearchResult}
        />
      </div>
      <div className="bg-bg flex flex-col items-center pt-[90px] pb-[300px] px-[100px]">
        {roomResult.map((room) => (
          <RoomResultCard
            roomId={room.room_id}
            roomType={room.room_type}
            roomImages={room.room_images}
            bedType={room.bed_types}
            description={room.description}
            area={room.area}
            price={room.price}
            promotionPrice={room.promotion_price}
            amenity={room.amenity}
            person={room.person}
            available={room.available}
            onRoomDetail={handleRoomDetail}
            onFullImage={handleFullImage}
            userInput={userInput}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default SearchResult;
