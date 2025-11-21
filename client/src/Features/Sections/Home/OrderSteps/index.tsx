const OrderSteps = () => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-1 gap-6">
        <div className="bg-white px-6 py-8 flex flex-col justify-center items-center gap-4 rounded-4xl">
          <div className="bg-[#343d41] px-3 py-2 rounded-full text-[17px] text-white shadow-sm">
            01
          </div>
          <h1 className="text-[26px] font-medium text-[#343d41]">
            Search & Select
          </h1>
          <h3 className="text-[19px] font-light text-[#343d41]">
            Pick destination & dates
          </h3>
          <p className="bg-[#f9f9f9] p-3 rounded-full text-[15px] font-light text-[#343d41]">
            Browse available hotels.
          </p>
        </div>
        <div className="bg-white px-6 py-8 flex flex-col justify-center items-center gap-4 rounded-4xl">
          <div className="bg-[#343d41] px-3 py-2 rounded-full text-[17px] text-white shadow-sm">
            02
          </div>
          <h1 className="text-[26px] font-medium text-[#343d41]">
            Choose Room
          </h1>
          <h3 className="text-[19px] font-light text-[#343d41]">
            Choose hotel & room
          </h3>
          <p className="bg-[#f9f9f9] p-3 rounded-full text-[15px] font-light text-[#343d41]">
            pick your preferred option.
          </p>
        </div>
        <div className="bg-white px-6 py-8 flex flex-col justify-center items-center gap-4 rounded-4xl">
          <div className="bg-[#343d41] px-3 py-2 rounded-full text-[17px] text-white shadow-sm">
            03
          </div>
          <h1 className="text-[26px] font-medium text-[#343d41]">
            Enter Details
          </h1>
          <h3 className="text-[19px] font-light text-[#343d41]">
            Add guest info
          </h3>
          <p className="bg-[#f9f9f9] p-3 rounded-full text-[15px] font-light text-[#343d41]">
            confirm booking summary
          </p>
        </div>
        <div className="bg-white px-6 py-8 flex flex-col justify-center items-center gap-4 rounded-4xl">
          <div className="bg-[#343d41] px-3 py-2 rounded-full text-[17px] text-white shadow-sm">
            04
          </div>
          <h1 className="text-[26px] font-medium text-[#343d41]">Confirm</h1>
          <h3 className="text-[19px] font-light text-[#343d41]">
            Pay & get confirmation
          </h3>
          <p className="bg-[#f9f9f9] p-3 rounded-full text-[15px] font-light text-[#343d41]">
            Receipt & details
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSteps;
