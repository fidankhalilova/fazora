const Footer = () => {
  return (
    <div className="bg-[#343d41] py-8">
      <div className="flex justify-between container mx-auto px-5">
        <div className="flex flex-col gap-3">
          <img
            src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3/68c14df658719eec11f94f7c_f36d154610edc7248bfe8b21b1fd953a_Logo%20%284%29.svg"
            alt=""
            className="w-23"
          />
          <p className="text-white text-sm">
            Find your perfect stay by selecting destination, dates, and guests.
          </p>
          <p className="text-white text-sm">
            © Fazen, All rights reserved 2025
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col text-center gap-2">
            <h2 className="font-medium text-white">Pages</h2>
            <button className="bg-[#343d41] hover:bg-white text-white hover:text-[#343d41] duration-200 px-4 py-2 rounded-full text-xs">
              Properties
            </button>
            <button className="bg-[#343d41] hover:bg-white text-white hover:text-[#343d41] duration-200 px-4 py-2 rounded-full text-xs">
              Blog
            </button>
          </div>
          <div className="flex flex-col text-center gap-2">
            <h2 className="font-medium text-white">Informations</h2>
            <button className="bg-[#343d41] hover:bg-white text-white hover:text-[#343d41] duration-200 px-4 py-2 rounded-full text-xs">
              License
            </button>
            <button className="bg-[#343d41] hover:bg-white text-white hover:text-[#343d41] duration-200 px-4 py-2 rounded-full text-xs">
              ChangeLog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
