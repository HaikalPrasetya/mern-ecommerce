function Hero() {
  return (
    <div className="h-full px-10">
      <div className="flex flex-col py-24 lg:py-36 md:flex-row items-center gap-20 lg:gap-32">
        {/* TEXT */}
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl">
            Digital Shopping Hub Junction
          </h1>
          <span className="text-md text-slate-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium, nihil consequuntur in vel minus non vitae labore
            expedita harum minima?
          </span>
          <button className="bg-white rounded py-2 border-2 border-black max-w-[200px] font-bold hover:bg-black hover:text-white transition-all ease-in-out duration-200">
            Shop Now
          </button>
        </div>
        {/* IMAGE */}
        <div className="md:flex-1">
          <img
            src="/hero.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
export default Hero;
