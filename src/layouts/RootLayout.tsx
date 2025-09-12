import { Outlet, useLocation } from "react-router-dom";
import PageHeader from "./PageHeader";
import Sidebar from "../components/Sidebar";
import { useSidebarStore } from "../store/useSidebarStore";

const RootLayout = () => {
  const { isOpen, toggle } = useSidebarStore();
  const location = useLocation();
  const isWatchPage = location.pathname === "/watch"; // watch page tekshirish

  return (
    <div className="flex flex-col h-screen">
      <PageHeader />
      <div className="flex flex-grow relative">
        {!isWatchPage ? (
          <div
            className={`${
              isOpen ? "w-64" : "w-16"
            } transition-all duration-300`}
          >
            <Sidebar />
          </div>
        ) : (
          isOpen && (
            <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-all">
              <Sidebar />
            </div>
          )
        )}

        <div
          className={`flex-1 overflow-auto ${
            isWatchPage && isOpen ? "blur-sm" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
