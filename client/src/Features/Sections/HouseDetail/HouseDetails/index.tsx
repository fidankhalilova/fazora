import { useState, useEffect } from "react";
import { MapPin, ArrowBigLeft, Bath, Bed } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { houseService } from "../../../../Services/houseApi";
import type {
  House,
  BookingDate,
  BookingRequest,
  UserBooking,
} from "../../../../Types/types";
import BookingModal from "../../../Components/BookingModal";

const HouseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<UserBooking[]>([]);
  const [blockedDates, setBlockedDates] = useState<BookingDate[]>([]);

  // Load cart and blocked dates from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("userCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }

    const savedBlockedDates = localStorage.getItem("blockedDates");
    if (savedBlockedDates) {
      try {
        const parsedDates = JSON.parse(savedBlockedDates);
        // Convert date strings back to Date objects
        const datesWithDateObjects = parsedDates.map((date: any) => ({
          startDate: new Date(date.startDate),
          endDate: new Date(date.endDate),
        }));
        setBlockedDates(datesWithDateObjects);
      } catch (error) {
        console.error("Error parsing blocked dates from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("userCart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const fetchHouse = async () => {
      if (!id) {
        setError("No house ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await houseService.getHouseById(parseInt(id));
        setHouse(response.data);
      } catch (err: any) {
        console.error("Error fetching house:", err);
        setError(err.message || "Failed to fetch house details");
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  const handleBook = (booking: BookingRequest) => {
    const newBooking: UserBooking = {
      id: Date.now().toString(),
      houseId: booking.houseId,
      houseName: booking.houseName,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      guests: booking.guests,
      children: booking.children,
      totalPrice: booking.totalPrice,
      status: "pending",
    };

    // Add to cart
    setCartItems((prev) => [...prev, newBooking]);

    // Block these dates
    const newBlockedDate: BookingDate = {
      startDate: booking.checkIn,
      endDate: booking.checkOut,
    };

    setBlockedDates((prev) => [...prev, newBlockedDate]);

    // Save blocked dates to localStorage
    const updatedBlockedDates = [...blockedDates, newBlockedDate];
    const blockedDatesForStorage = updatedBlockedDates.map((date) => ({
      startDate: date.startDate.toISOString(),
      endDate: date.endDate.toISOString(),
    }));
    localStorage.setItem(
      "blockedDates",
      JSON.stringify(blockedDatesForStorage)
    );

    // Show success message
    alert("Added to cart successfully!");
  };

  if (loading) {
    return (
      <div className="mt-50 mb-30 relative z-5 flex justify-center items-center">
        <div className="bg-white rounded-4xl px-10 py-12 flex justify-center items-center w-240">
          <div className="text-lg">Loading house details...</div>
        </div>
      </div>
    );
  }

  if (error || !house) {
    return (
      <div className="mt-50 mb-30 relative z-5 flex justify-center items-center">
        <div className="bg-white rounded-4xl px-10 py-12 flex flex-col items-center gap-6 w-240">
          <div className="text-red-500 text-lg text-center">
            {error || "House not found"}
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex gap-2 text-gray-500 bg-gray-100 px-3 py-2 rounded-4xl hover:cursor-pointer"
          >
            <ArrowBigLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-50 mb-30 relative z-5 flex justify-center items-center">
      <div className="bg-white rounded-4xl px-10 py-12 flex flex-col gap-6 w-240">
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex gap-2 text-gray-500 bg-gray-100 px-3 py-2 rounded-4xl hover:bg-gray-300 duration-500 hover:cursor-pointer"
          >
            <ArrowBigLeft /> Back to Home
          </button>
          <p className="text-gray-500 bg-gray-100 text-md font-light flex gap-2 px-3 py-2 rounded-4xl">
            <MapPin /> {house.location}
          </p>
        </div>
        <h1 className="text-[40px]">{house.name}</h1>
        <h3 className="text-[18px]">
          {house.image?.caption ||
            "Clean lines and contrast in city structures."}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <p className="px-4 py-1.5 text-gray-500 bg-gray-100 rounded-2xl font-light flex gap-2">
              <Bath /> {house.bathroom} Bathroom
              {house.bathroom !== 1 ? "s" : ""}
            </p>
            <p className="px-4 py-1.5 text-gray-500 bg-gray-100 rounded-2xl font-light flex gap-2">
              <Bed /> {house.bedroom} Bedroom{house.bedroom !== 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">
              ${house.price.toLocaleString()}
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-4xl">
            <img
              src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0edb35744eedad4a4e402_6896bc17afb8a1037cd9e3a9_Serene%2520Modern%2520Interior%2520with%2520Green%2520Lounge%2520Chair.png"
              alt="Main view"
              className="rounded-4xl object-cover h-[300px] w-full hover:scale-103 duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-4xl">
            <img
              src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0edb44ff0185640e79b48_6896bc0f3c522ce38b705edb_Serene%2520Sunlit%2520Interior.png"
              alt="Interior view"
              className="rounded-4xl object-cover h-[300px] w-full hover:scale-103 duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-4xl">
            <img
              src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0edb44ff0185640e79b4e_6896bc20ea3c50c9cc704eba_Modern%2520Airy%2520Living%2520Room%2520with%2520Indoor%2520Greenery.png"
              alt="Living room"
              className="rounded-4xl object-cover h-[300px] w-full hover:scale-103 duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-4xl">
            <img
              src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0edb44ff0185640e79b4b_6896bc2dad430c3f57a27693_Luxurious%2520Living%2520Room%2520Interior.png"
              alt="Luxurious interior"
              className="rounded-4xl object-cover h-[300px] w-full hover:scale-103 duration-500"
            />
          </div>
        </div>
        <ul className="text-gray-600 text-[18px] flex flex-col gap-2">
          <li>
            The {house.name} is a secluded sanctuary where timeless elegance
            meets modern luxury.
          </li>
          <li>
            Spanning 7,000 sq. ft., this {house.bedroom}-bedroom,{" "}
            {house.bathroom}-bathroom masterpiece offers an exceptional living
            experience for those who appreciate space, comfort, and
            sophistication.
          </li>
          <li>
            Designed for both grand entertaining and intimate moments, the home
            features expansive living areas, a state-of-the-art gourmet kitchen,
            and a magnificent dining room.
          </li>
          <li>
            Floor-to-ceiling windows bathe the interiors in natural light while
            framing breathtaking views, seamlessly blending indoor and outdoor
            living.
          </li>
          <li>
            The master suite is a private oasis, complete with a spa-inspired
            ensuite and a spacious walk-in closet. Outside, a shimmering
            infinity pool, lush gardens, and an inviting terrace create the
            perfect setting for relaxation or entertainment.
          </li>
          <li>
            Every detail of {house.name} showcases impeccable craftsmanship and
            thoughtful design, making it not just a home, but a statement of
            refined living.
          </li>
        </ul>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#343d41] text-white px-6 py-3 rounded-full text-sm w-30 flex items-center justify-center gap-2"
        >
          Book Now
        </button>

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          house={{
            id: house.id,
            name: house.name,
            price: house.price,
          }}
          blockedDates={blockedDates}
          onBook={handleBook}
        />
      </div>
    </div>
  );
};

export default HouseDetails;
