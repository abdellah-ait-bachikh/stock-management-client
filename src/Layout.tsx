import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="h-screen w-screen bg-gray-300 relative flex flex-row">
      <Aside />
      <section className="grow bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-1"><Outlet/></main>
      </section>
    </div>
  );
};

export default Layout;
