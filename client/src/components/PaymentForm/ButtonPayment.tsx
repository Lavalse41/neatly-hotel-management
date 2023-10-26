interface ButtonPaymentProps {
  isActive: boolean;
  onClick: () => void;
  image: string;
  title: string;
}

function ButtonPayment(props: ButtonPaymentProps) {
  return (
    <button
      onClick={props.onClick}
      className={
        props.isActive
          ? "bg-white border-[1px] border-orange-500 rounded w-[250px] h-[80px] py-6 flex gap-2 items-center justify-center drop-shadow-lg"
          : "bg-white border-[1px] border-gray-300 rounded w-[250px] h-[80px] py-6 flex gap-2 items-center justify-center drop-shadow-lg"
      }
    >
      {props.isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
        >
          <path
            d={props.image}
            stroke="#E76B39"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
        >
          <path
            d={props.image}
            stroke="#E4E6ED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <p
        className={
          props.isActive
            ? "text-orange-500 text-headline5"
            : "text-gray-600 text-headline5"
        }
      >
        {props.title}
      </p>
    </button>
  );
}

export default ButtonPayment;
