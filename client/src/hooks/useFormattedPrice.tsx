function useFormattedPrice(number:number|string){
  return parseFloat(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default useFormattedPrice;
