import { MapPin } from "lucide-react";
import type { House } from "../../../Types/types";

interface HouseCartProps {
  house: House;
}

const HouseCart = ({ house }: HouseCartProps) => {
  const getImageUrl = (): string => {
    if (house.image?.formats?.large?.url) {
      return `http://localhost:1337${house.image.formats.large.url}`;
    }

    if (house.image?.formats?.medium?.url) {
      return `http://localhost:1337${house.image.formats.medium.url}`;
    }

    if (house.image?.url) {
      return `http://localhost:1337${house.image.url}`;
    }

    return "https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0f540a40a075623084298_Modern%20Coastal%20Retreat.png";
  };

  const imageUrl = getImageUrl();

  return (
    <div className="rounded-2xl overflow-hidden relative">
      <img
        src={imageUrl}
        alt={house.image?.alternativeText || house.name}
        className="w-full h-[400px] object-cover hover:scale-103 duration-900 relative"
        onError={(e) => {
          e.currentTarget.src =
            "https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0f540a40a075623084298_Modern%20Coastal%20Retreat.png";
        }}
      />
      <div className="absolute top-7 left-7 z-7">
        <p className="text-white text-md font-light flex gap-2 py-1.5">
          <MapPin /> {house.location}
        </p>
      </div>
      <div className="flex gap-3 absolute top-7 right-7 z-7">
        <p className="px-4 py-1.5 bg-white rounded-2xl font-light">
          {house.bedroom} Bedroom{house.bedroom !== 1 ? "s" : ""}
        </p>
        <p className="px-4 py-1.5 bg-white rounded-2xl font-light">
          {house.bathroom} Bathroom{house.bathroom !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="backdrop-blur-md w-full h-18 absolute bottom-0">
        <div className="absolute bottom-6 left-7 z-7">
          <h2 className="text-white text-xl font-light">{house.name}</h2>
        </div>
        <div className="absolute bottom-6 right-7 z-7">
          <h2 className="text-white text-xl font-light">
            ${house.price.toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HouseCart;
