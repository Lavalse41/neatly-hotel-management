import RoomDetailSlidebar from "../RoomDetail/RoomDetailSlidebar";

interface ImageFullPopupProps {
  roomImages: string[];
  onClosePopup: () => void;
}

function ImageFullPopup({ roomImages, onClosePopup }: ImageFullPopupProps) {
  console.log(roomImages);
  return (
    <div className="w-screen h-screen flex flex-col justify-center bg-black">
      <div className="absolute top-0 right-0">
        <div className="w-screen h-screen" onClick={onClosePopup}></div>
        <button className="absolute top-0 right-0" onClick={onClosePopup}>
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
      <RoomDetailSlidebar roomImages={roomImages} />
    </div>
  );
}

export default ImageFullPopup;
