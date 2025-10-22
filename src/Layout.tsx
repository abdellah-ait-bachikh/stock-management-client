import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import type { RootStateType } from "./redux/store";
import { appActions } from "./redux/slices/appSLice";

const Layout = () => {
  const { isAsideOpen } = useSelector((state: RootStateType) => state.app);
  const dispatch = useDispatch();



  const closeSidebar = () => {
    dispatch(appActions.setAsideOpen(false));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-neutral-800">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header/>

        <main className="flex-1 overflow-y-auto  mt-20 transition-all duration-300">
          <Outlet />
        </main>
      </div>

      {isAsideOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
