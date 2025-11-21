import { Star } from "lucide-react";

const VideoIntros = () => {
  return (
    <div className="my-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex gap-1 text-3xl bg-white text-black rounded-full px-3 py-2">
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <div>
            <h1 className="text-[45px] font-light">
              Where design innovation meets luxury.
            </h1>
          </div>
        </div>
        <div className="border-30 border-white rounded-4xl relative">
          <img
            src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3%2F68c0fe3ec8351d8382a5177c_1757391904279869-poster-00001.jpg"
            alt=""
            className="w-full h-[548px] object-cover rounded-4xl relative"
          />
          <div className="absolute bottom-6 right-7">
            <img
              src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3/68c0e3e4af3be748783bb4a3_icon-park-solid--play.svg"
              alt=""
              className="w-15 h-15 hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 items-center">
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-full">
            Instant Booking
          </div>
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-full">
            Exclusive
          </div>
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-full">
            Newly Added
          </div>
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-full">
            Best Value
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoIntros;
