function Loader({ size = 16, color = `gray-500` }) {
  return (
    <span
      className={`loading loading-spinner w-${size} bg-${color} relative left-1/2 top-96`}
    ></span>
  );
}

export default Loader;
