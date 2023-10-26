export default interface UserInputType {
  checkInDate: string;
  checkOutDate: string;
  room: number;
  person: number;
  night: number;
  roomType?: string;
  totalPrice: string | number;
}
