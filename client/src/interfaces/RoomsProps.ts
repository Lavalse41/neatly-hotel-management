import UserInputType from "./UserInputType";

export default interface RoomsProps {
  room_id: number;
  room_type: string;
  price: number;
  promotion_price: number;
  bed_types: string;
  area: string;
  amenity: string[];
  description: string;
  room_images: string[];
  person: number;
  room_amount: number;
  available: boolean;
  userInput: UserInputType;
}
