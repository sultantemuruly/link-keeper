const Hero = () => {
  return (
    <div className="pt-20 px-10 md:px-20 flex flex-col gap-10 justify-center md:flex-row">
      <div className="p-4 lg:w-1/2 flex flex-col items-center justify-center bg-[#2a8cff] text-white hover:bg-white hover:text-[#2a8cff] transition-all duration-300 ease-in-out">
        <div className="text-xl md:text-2xl font-bold">
          Organize the references
        </div>
        <p className="md:w-1/2 text-center text-lg md:text-xl font-light p-4">
          This app offers a convenient solution for storing your links. It
          simplifies saving, organizing, and accessing your favorite URLs all in
          one place.
        </p>
      </div>
      <div className="flex justify-center lg:w-1/2 hover:scale-105 transition-all duration-300 ease-in-out">
        <img
          src="image1.svg"
          alt="image"
          className="w-[512px] min-w-[256px] max-w-full flex-shrink-0 object-contain"
        />
      </div>
    </div>
  );
};
export default Hero;
