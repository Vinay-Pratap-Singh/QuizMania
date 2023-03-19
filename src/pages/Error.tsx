const Error = () => {
  return (
    <div className="ml-60 flex items-center justify-center h-[100vh] w-full">
      {/* creating the error card */}
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h3 className="text-3xl font-semibold">Oops... Page Not Found!</h3>
        <p>Sorry! The page you are trying to get is not available</p>
      </div>
    </div>
  );
};

export default Error;
