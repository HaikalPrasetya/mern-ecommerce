function BannerMens() {
  return (
    <div className="h-fit bg-white border-2 border-black px-10 overflow-hidden md:py-5 shadow-md rounded">
      <div className="flex flex-col my-24 md:my-0 md:flex-row items-center gap-20 lg:gap-32">
        {/* TEXT */}
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
            SUMMER COLLECTION
          </h1>
          <span className="text-lg text-slate-900 font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
            eligendi.
          </span>
          <div className="bg-white rounded py-2 border-2 border-black max-w-[200px] font-bold transition-all ease-in-out duration-200 text-center">
            25% OFF
          </div>
        </div>
        {/* IMAGE */}
        <div className="md:flex-1">
          <img
            src="/bannerMen.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
export default BannerMens;
