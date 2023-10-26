import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/BookingHistory/HistoryCard";
import Footer from "../components/Footer";
import BookingsContext from "../contexts/BookingContext";
import { useContext } from "react";
import RoomDetailPopup from "../components/SearchResult/RoomDetailPopup.tsx";
import { RoomsContext } from "../App.tsx";
import RoomsProps from "../interfaces/RoomsProps.tsx";
import BookingType from "../interfaces/BookingType";

function BookingHistory() {
  const { bookingsHistory }: { bookingsHistory: BookingType[] | undefined } =
    useContext(BookingsContext);
  const context = useContext(RoomsContext);

  const sortedBookingsHistory = [...bookingsHistory].sort(
    (a, b) => b.book_id - a.book_id
  );

  // find roomId
  const [rooms, setRoom] = useState<RoomsProps | null>(null);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

  function handleRoomDetail(roomId: number) {
    const room = context.rooms.find(
      (room: RoomsProps) => room.room_id === roomId
    );
    if (room !== null) {
      setRoom(room);
      setShowRoomDetail(true);
    }
  }

  /*close full image and room detail*/
  function handleClosePopup() {
    setShowRoomDetail(false);
  }

  function extractBookIds(sortedBookingsHistory) {
    return bookingsHistory.map((book: BookingType) => book.book_id);
  }

  let bookIds = extractBookIds(sortedBookingsHistory);

  bookIds = bookIds.sort((a: number, b: number) => b - a);

  console.log(bookingsHistory);

  return (
    <div>
      {showRoomDetail && (
        <div className="sticky z-50 top-0 flex justify-center">
          <RoomDetailPopup
            roomId={rooms.room_id}
            roomType={rooms.room_type}
            roomImages={rooms.room_images}
            bedType={rooms.bed_types}
            description={rooms.description}
            area={rooms.area}
            price={rooms.price}
            promotionPrice={rooms.promotion_price}
            amenity={rooms.amenity}
            person={rooms.person}
            onClosePopup={handleClosePopup}
          />
        </div>
      )}

      <Navbar />

      <div className="bg-bg flex flex-col items-center pt-20 pb-32">
        <div className="bg-bg w-[1120px] pb-12">
          <h1 className="  font-noto-serif-display text-headline2 font-medium text-gray-900">
            Booking History
          </h1>
        </div>
        {sortedBookingsHistory.map((book: BookingType, index: number) => (
          <HistoryCard
            bookingsHistory={sortedBookingsHistory}
            cardKey={index}
            bookIds={bookIds}
            bookId={book.book_id}
            bookDate={book.booking_date}
            checkIn={book.check_in}
            checkOut={book.check_out}
            roomId={book.room_id}
            paymentMethod={book.payment_method}
            threeCreditCardNum={book.three_credit_card_num}
            totalPrice={book.total_price}
            totalPriceAddReqs={book.total_price_add_reqs}
            standard={book.standard_request}
            special={book.special_request}
            additional={book.additional_request}
            onRoomDetail={handleRoomDetail}
            night={book.amount_night}
            roomType={book.room_details.room_type}
            roomImages={book.room_details.room_images}
            personAmount={book.amount_stay}
            roomAmount={book.amount_room}
            cancel_date={book.cancel_date}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default BookingHistory;
