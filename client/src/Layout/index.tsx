import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mt-20 container mx-auto px-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
