import { Link } from "react-router-dom";
import { sidebarItems } from "../data/sideBarData";
import { useSidebarStore } from "../store/useSidebarStore";

const Sidebar = () => {
  const { isOpen } = useSidebarStore();

  return (
    <aside
      className={`h-full border-r border-gray-200 bg-white overflow-hidden transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <nav className="flex flex-col gap-2 p-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.route}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Icon className="text-xl" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
