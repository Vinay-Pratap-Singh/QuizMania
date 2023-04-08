import "./Loader.css";
const Loader = () => {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center preserve-3d">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
      <p className="text-xs font-bold">Processing...</p>
    </div>
  );
};

export default Loader;
