import Aside from "./components/Aside";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="h-screen w-screen bg-amber-200 relative flex flex-row">
      <Aside />
      <section className="grow bg-amber-950 flex flex-col">
        <Header />
        <main className="bg-blue-500 flex-1">content</main>
      </section>
    </div>
  );
};

export default Layout;
