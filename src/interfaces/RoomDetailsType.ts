export default interface RoomDetailsType {
  room_id: number;
  room_type: string;
  price: number;
  promotion_price: number;
  bed_types: string;
  area: string;
  amenity: string[];
  description: string;
  room_images: string[];
  created_at: string;
  updated_at: string;
  person: number;
  room_amount: number;
  avaliable: number;
}
