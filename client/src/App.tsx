import { router } from "./router";
import { RouterProvider } from "react-router";
import { CartProvider } from "./Features/Shared/CardContext";

const App = () => {
  return (
    <div>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </div>
  );
};

export default App;
