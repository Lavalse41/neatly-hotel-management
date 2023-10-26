function NotFound() {
  return (
    <div className="h-screen w-full pt-32 flex flex-col items-center bg-gray-300">
      <div className="text-headline2 text-green-800 font-noto-serif-display">
        Page Not Found
      </div>
      <div className="mt-8 text-body1 font-inter">
        The page you are looking for doesn't exist or an other error occured
        occurs.
      </div>
    </div>
  );
}

export default NotFound;
