import { ShoppingCart, User, LogOut } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../Auth/AuthContext";
import { useCart } from "../../Features/Shared/CardContext";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return nights;
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="bg-[#f8f8f8] text-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-5 flex justify-between items-center py-3">
        <div>
          <img
            src="https://cdn.prod.website-files.com/68c0e3e4af3be748783bb0f3/68c0fe6624508c7f0f8a163e_c230208425afdc760621f0c683c3f941_Logo%20%285%29.svg"
            alt="Logo"
            className="w-23"
          />
        </div>
        <div className="flex gap-5 items-center">
          {user && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <User size={16} />
                <span>Welcome, {user.username}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="bg-[#343d41] duration-500 hover:bg-[#474c4f] text-white px-6 py-3 rounded-full text-sm">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Start booking some amazing houses!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow"
                    >
                      <div className="shrink-0">
                        <img
                          src={
                            item.imageUrl ||
                            "https://cdn.prod.website-files.com/68c0e3e4af3be748783bb100/68c0f540a40a075623084298_Modern%20Coastal%20Retreat.png"
                          }
                          alt={item.houseName}
                          className="w-32 h-24 object-cover rounded-xl"
                        />
                      </div>

                      <div className="grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {item.houseName}
                            </h3>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-4">
                                <span>
                                  <strong>Dates:</strong>{" "}
                                  {formatDate(item.checkIn)} -{" "}
                                  {formatDate(item.checkOut)}
                                </span>
                                <span>
                                  <strong>Nights:</strong>{" "}
                                  {calculateNights(item.checkIn, item.checkOut)}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span>
                                  <strong>Guests:</strong> {item.guests} adult
                                  {item.guests !== 1 ? "s" : ""}
                                </span>
                                {item.children > 0 && (
                                  <span>
                                    <strong>Children:</strong> {item.children}{" "}
                                    child{item.children !== 1 ? "ren" : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ${item.totalPrice.toLocaleString()}
                            </p>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    Continue Booking
                  </button>
                  <button
                    onClick={() => {
                      alert("Proceeding to checkout!");
                      setIsCartOpen(false);
                    }}
                    className="flex-1 py-3 px-6 bg-[#343d41] text-white rounded-2xl hover:bg-[#474c4f] transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
