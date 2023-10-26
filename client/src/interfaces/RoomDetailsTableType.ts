export default interface RoomDetailsTableType {
  roomId: number;
  roomNumber: number;
  roomType: string;
  bedType: string;
  roomStatus: string;
  area?: string;
  price?: string | number;
  promotionPrice?: string | number;
  amenity?: string[];
  person?: number;
  description?: string;
  roomImages: string[];
  onClosePopup?: () => void;
  available: number;
}
