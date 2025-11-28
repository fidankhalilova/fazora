import { router } from "./router";
import { RouterProvider } from "react-router";
import { CartProvider } from "./Features/Shared/CardContext";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </Provider>
    </div>
  );
};

export default App;
