import UsersType from "./UsersType";
import RoomDetailsType from "./RoomDetailsType";

export default interface BookingType {
  json(): unknown;
  book_id?: number | string;
  booking_date?: string;
  amount_room: number;
  amount_stay: number;
  check_in: string;
  check_out: string;
  room_id: number;
  user_id: number;
  total_price: number;
  update_booking_date?: string;
  standard_request: string[];
  special_request: string[];
  additional_request: string;
  room_avaliable_id?: number;
  status?: string | null;
  room_status?: string;
  cancel_date?: string;
  three_credit_card_num?: string;
  payment_method?: string;
  amount_night: number;
  total_price_add_reqs: number;
  users?: UsersType;
  room_details?: RoomDetailsType;
  array_of_room_avaliable: RoomAvailableType[];
}

export interface RoomAvailableType {
  room_avaliable_id: number;
  room_id: number;
  status: string;
  check_in: string;
  check_out: string;
  user_id: number;
  room_status: string;
}
