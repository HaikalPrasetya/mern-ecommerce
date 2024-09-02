function BannerSummerSale() {
  return (
    <div className="h-fit bg-white px-10 overflow-hidden md:py-5">
      <div className="flex flex-col my-24 md:my-0  md:flex-row-reverse items-center gap-20 lg:gap-32">
        {/* TEXT */}
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
            Digital Shopping Hub Junction
          </h1>
          <span className="text-lg text-slate-900 font-semibold">
            {"Men's"} Leather Formal Wear Shoes
          </span>
          <button className="bg-white rounded py-2 border-2 border-black max-w-[200px] font-bold hover:bg-black hover:text-white transition-all ease-in-out duration-200">
            Shop Now
          </button>
        </div>
        {/* IMAGE */}
        <div className="md:flex-1">
          <img
            src="/bannerShoesh.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
export default BannerSummerSale;
