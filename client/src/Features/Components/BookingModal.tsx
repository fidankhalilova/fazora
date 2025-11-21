import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, isWithinInterval, eachDayOfInterval } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Define interfaces directly in the component file
interface BookingDate {
  startDate: Date;
  endDate: Date;
}

interface BookingRequest {
  houseId: number;
  houseName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  children: number;
  totalPrice: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  house: {
    id: number;
    name: string;
    price: number;
  };
  blockedDates: BookingDate[];
  onBook: (booking: BookingRequest) => void;
}

const BookingModal = ({
  isOpen,
  onClose,
  house,
  blockedDates,
  onBook,
}: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Check if a date is blocked
  const isDateBlocked = (date: Date) => {
    return blockedDates.some((blocked) => {
      try {
        return isWithinInterval(date, {
          start: new Date(blocked.startDate),
          end: new Date(blocked.endDate),
        });
      } catch (error) {
        console.error("Error checking date interval:", error);
        return false;
      }
    });
  };

  // Calculate total price
  useEffect(() => {
    if (checkIn && checkOut && checkIn < checkOut) {
      const nights = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(nights * house.price);
    } else {
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, house.price]);

  // Get all blocked dates for highlighting
  const getAllBlockedDates = (): Date[] => {
    const allBlocked: Date[] = [];
    blockedDates.forEach((blocked) => {
      try {
        const start = new Date(blocked.startDate);
        const end = new Date(blocked.endDate);
        if (start && end && start <= end) {
          const dates = eachDayOfInterval({ start, end });
          allBlocked.push(...dates);
        }
      } catch (error) {
        console.error("Error processing blocked date interval:", error);
      }
    });
    return allBlocked;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    if (checkIn >= checkOut) {
      alert("Check-out date must be after check-in date");
      return;
    }

    // Check if selected dates are blocked
    const selectedDates = eachDayOfInterval({ start: checkIn, end: checkOut });
    const hasBlockedDates = selectedDates.some((date) => isDateBlocked(date));

    if (hasBlockedDates) {
      alert(
        "Selected dates include unavailable dates. Please choose different dates."
      );
      return;
    }

    const booking: BookingRequest = {
      houseId: house.id,
      houseName: house.name,
      checkIn,
      checkOut,
      guests,
      children,
      totalPrice,
    };

    onBook(booking);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
    setChildren(0);
    setTotalPrice(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book {house.name}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Date
              </label>
              <DatePicker
                selected={checkIn}
                onChange={(date: Date | null) => setCheckIn(date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={new Date()}
                excludeDates={getAllBlockedDates()}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Select check-in date"
                filterDate={(date: Date) => !isDateBlocked(date)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Date
              </label>
              <DatePicker
                selected={checkOut}
                onChange={(date: Date | null) => setCheckOut(date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn ? addDays(checkIn, 1) : new Date()}
                excludeDates={getAllBlockedDates()}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Select check-out date"
                filterDate={(date: Date) => !isDateBlocked(date)}
                required
              />
            </div>
          </div>

          {/* Guest Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adults
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Adult" : "Adults"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="children"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Children
              </label>
              <select
                id="children"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Child" : "Children"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Summary */}
          {totalPrice > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              {checkIn && checkOut && (
                <p className="text-sm text-gray-600 mt-2">
                  {Math.ceil(
                    (checkOut.getTime() - checkIn.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  nights × ${house.price}/night
                </p>
              )}
            </div>
          )}

          {/* Blocked Dates Info */}
          {blockedDates.length > 0 && (
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 flex items-center">
                <span className="mr-2">⚠️</span>
                Some dates are already booked and unavailable
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!checkIn || !checkOut || totalPrice === 0}
              className="flex-1 py-3 px-6 bg-[#343d41] text-white rounded-lg hover:bg-[#2a3236] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
