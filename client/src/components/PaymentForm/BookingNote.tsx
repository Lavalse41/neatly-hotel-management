function BookingNote() {
  return (
    <>
      <ul className="w-[358px] bg-gray-300 rounded-md text-green-800 text-body3 p-4">
        <li className="pb-5 pl-2">
          Cancel booking will get full refund if the cancelation occurs before
          24 hours of the check-in date.
        </li>
        <li className="pl-2">
          Able to change check-in or check-out date booking within 24 hours of
          the booking date
        </li>
      </ul>
    </>
  );
}

export default BookingNote;
