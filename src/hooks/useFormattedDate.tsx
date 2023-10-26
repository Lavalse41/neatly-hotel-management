import dayjs from "dayjs";

function useFormattedDate(date: string): string {
  return dayjs(date).format("dd, D MMM YYYY");
}

export default useFormattedDate;
