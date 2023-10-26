import RoomDetailsType from "../../interfaces/RoomDetailsType";
import RoomCard from "../Home/RoomCard";

function RoomDetailPageOtherRoom({
  otherRooms,
}: {
  otherRooms: RoomDetailsType[];
}) {
  return (
    <div className=" bg-green-200  flex flex-col items-center pt-[90px] pb-[100px] px-[160px]">
      <div>
        <h1 className="text-black text-headline3 text-center font-noto-serif-display mb-14">
          Other Rooms
        </h1>
        <div className="flex flex-row gap-6">
          {otherRooms.map((room) => (
            <div className="flex h-[340px]">
              <RoomCard roomType={room.room_type} cardWidth={"548px"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPageOtherRoom;
