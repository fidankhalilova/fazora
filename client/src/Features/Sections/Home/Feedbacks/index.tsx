import { Star } from "lucide-react";

const Feedbacks = () => {
  return (
    <div className="my-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-full">
            Testimonials
          </div>
          <h1 className="text-[45px] font-light text-[#343d41]">
            Hear from Our User
          </h1>
          <p className="text-[20px] font-light text-[#42494b]">
            Read how our users have achieved success
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-5 bg-white rounded-4xl px-6 py-5">
            <div className="flex gap-1 text-3xl bg-[#f9f9f9] text-yellow-600 rounded-full px-3 py-2 w-30">
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-gray-500 text-[18px]">
                  Immerse yourself in a world where luxury meets sustainability,
                  offering a seamless blend of comfort and innovation.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[20px]">Henki</h4>
                  <h5 className="text-[16px] text-gray-400">Buyer</h5>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3/68c0e3e4af3be748783bb48b_streamline-logos--x-twitter-logo-solid.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 bg-white rounded-4xl px-6 py-5">
            <div className="flex gap-1 text-3xl bg-[#f9f9f9] text-yellow-600 rounded-full px-3 py-2 w-30">
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-gray-500 text-[18px]">
                  Dive into a realm where opulence eco-friendliness coexist,
                  creating a perfect harmony of comfort and cutting-edge design.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[20px]">Henki</h4>
                  <h5 className="text-[16px] text-gray-400">Artist</h5>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3/68c0e3e4af3be748783bb48b_streamline-logos--x-twitter-logo-solid.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 bg-white rounded-4xl px-6 py-5">
            <div className="flex gap-1 text-3xl bg-[#f9f9f9] text-yellow-600 rounded-full px-3 py-2 w-30">
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-gray-500 text-[18px]">
                  Experience a realm where elegance and eco-consciousness merge,
                  delivering an unparalleled fusion of comfort and modernity.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[20px]">Henki</h4>
                  <h5 className="text-[16px] text-gray-400">Designer</h5>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3/68c0e3e4af3be748783bb48b_streamline-logos--x-twitter-logo-solid.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-white px-3 py-2 font-light text-[#343d41] rounded-full flex gap-2">
            <Star className="text-[18px]" /> 1,500 happy clients
            <Star className="text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
