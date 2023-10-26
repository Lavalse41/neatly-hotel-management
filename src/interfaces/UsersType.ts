export default interface UsersType {
  id: number;
  created_at: string;
  email: string;
  country: string;
  birthDate: string;
  idNumber: string;
  fullName: string;
  credit_card_id: number;
  username: string;
  profile_image: string;
  password: string;
  updated_at: string;
  role: string;
  notification: string[];
  notification_count: number;
}
