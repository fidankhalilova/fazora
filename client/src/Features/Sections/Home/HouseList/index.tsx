import { Link } from "react-router";
import { useState, useEffect } from "react";
import type { House } from "../../../../Types/types";
import { houseService } from "../../../../Services/houseApi";
import HouseCart from "../../../Shared/HouseCart";

const HouseList = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const response = await houseService.getAllHouses();
        console.log("Full API response:", response); // Debug log
        console.log("First house data:", response.data[0]); // Debug log
        setHouses(response.data);
      } catch (err) {
        setError("Failed to fetch houses");
        console.error("Error fetching houses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading houses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-15 mb-20 mt-30">
        <div className="text-center flex flex-col gap-2">
          <p className="text-sm">
            <span className="bg-white px-3 py-2 rounded-2xl text-[#343d41] text-[16px]">
              Premium Estates
            </span>
          </p>
          <h1 className="text-[40px] font-light">
            Discover homes designed to inspire.
          </h1>
          <p className="text-[19px] font-light text-[#343d41]">
            Luxury residences where design meets comfort
          </p>
        </div>
        <div id="houseCarts" className="grid grid-cols-2 gap-10">
          {houses.map((house) => (
            <Link key={house.id} to={`/house/${house.id}`}>
              <HouseCart house={house} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseList;
