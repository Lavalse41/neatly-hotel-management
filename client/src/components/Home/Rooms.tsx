import RoomCard from "./RoomCard.tsx";

function Rooms() {
  return (
    <div
      className="py-28 px-40 flex flex-col items-center justify-center bg-white"
      id="roomSuits"
    >
      <div className="font-noto-serif-display text-green-800 text-headline2">
        Rooms & Suits
      </div>
      <div className="mt-[72px] w-full grid grid-cols-5 gap-4">
        <div className="grid col-span-5 h-[540px] transition ease-out delay-150 duration-200  hover:brightness-125">
          <RoomCard roomType={"Superior Garden View"} cardWidth={""} />
        </div>
        <div className="grid col-span-3 row-start-2 h-[400px] transition ease-out delay-150 duration-200  hover:brightness-125">
          <RoomCard roomType={"Deluxe"} cardWidth={""} />
        </div>
        <div className="grid col-span-2 row-span-2 col-start-1 row-start-3 transition ease-out delay-150 duration-200  hover:brightness-125">
          <RoomCard roomType={"Premier Sea View"} cardWidth={""} />
        </div>
        <div className="grid col-span-3 col-start-3 row-start-3 h-[338px] transition ease-out delay-150 duration-200  hover:brightness-125">
          <RoomCard roomType={"Supreme"} cardWidth={""} />
        </div>
        <div className="grid col-span-3 col-start-3 row-start-4 h-[338px] transition ease-out delay-150 duration-200  hover:brightness-125">
          <RoomCard roomType={"Suite"} cardWidth={""} />
        </div>
        <div className="grid col-span-2 col-start-4 row-start-2h-[400px] transition ease-out delay-150 duration-200  hover:brightness-125">
          <RoomCard roomType={"Superior"} cardWidth={""} />
        </div>
      </div>
    </div>
  );
}

export default Rooms;
