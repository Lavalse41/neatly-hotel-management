import Navbar from "../components/Navbar";
import RoomDetailSlidebar from "../components/RoomDetail/RoomDetailSlidebar";
import RoomDetailPageContent from "../components/RoomDetail/RoomDetailPageContent";
import RoomDetailPageOtherRoom from "../components/RoomDetail/RoomDetailPageOtherRoom";
import Footer from "../components/Footer";
import RoomDetailsType from "../interfaces/RoomDetailsType";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomsContext } from "../App.tsx";
import axios from "axios";
import Loader from "../components/Loader.tsx";

function RoomDetail() {
  const [roomDetail, setRoomDetail] = useState<RoomDetailsType | null>(null);
  const [otherRooms, setOtherRooms] = useState<RoomDetailsType[]>([]);
  const context = useContext(RoomsContext);
  const params = useParams();
  const navigate = useNavigate();

  const getRoomId = async () => {
    try {
      const res = await axios.get(
        `https://neatly-dj6ygctp8-lavalse41.vercel.app/room/${params.roomId}`
      );
      setRoomDetail(res.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
      navigate("/NotFound");
    }
  };

  useEffect(() => {
    getRoomId();
  }, [params.roomId]);

  useEffect(() => {
    if (roomDetail !== null && context.rooms.length > 0) {
      const unselectedRooms = context.rooms.filter(
        (room) => room.room_id !== Number(params.roomId)
      );

      const selectedOtherRooms: RoomDetailsType[] = [];

      if (unselectedRooms.length >= 2) {
        while (selectedOtherRooms.length < 2) {
          const randomIndex = Math.floor(
            Math.random() * unselectedRooms.length
          );
          const selectedRoom = unselectedRooms[randomIndex];

          if (!selectedOtherRooms.includes(selectedRoom)) {
            selectedOtherRooms.push(selectedRoom);
          }
        }
      } else {
        selectedOtherRooms.push(...unselectedRooms);
      }
      setOtherRooms(selectedOtherRooms);
    }
  }, [roomDetail, context.rooms, params.roomId]);

  if (roomDetail === null || !roomDetail.room_type) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 bg-gray-200">
        <RoomDetailSlidebar roomImages={roomDetail.room_images} />
      </div>

      <RoomDetailPageContent
        roomType={roomDetail.room_type}
        bedType={roomDetail.bed_types}
        description={roomDetail.description}
        area={roomDetail.area}
        price={roomDetail.price}
        promotionPrice={roomDetail.promotion_price}
        amenity={roomDetail.amenity}
        person={roomDetail.person}
      />
      <RoomDetailPageOtherRoom otherRooms={otherRooms} />
      <Footer />
    </>
  );
}

export default RoomDetail;
