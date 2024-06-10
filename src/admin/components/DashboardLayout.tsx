import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex gap-8 h-screen">
      <nav>
        <ul className="bg-card text-card-foreground min-w-40 flex-1 flex flex-col items-center py-4 gap-5 font-bold text-lg h-screen border border-border rounded">
          <li>
            <Link to={"."}> Meals</Link>
          </li>
          <li>
            <Link to={"orders"}>Orders</Link>
          </li>
          <li>
            <Link to={"settings"}>Settings</Link>
          </li>
          <li>
            <Link to={"Logout"}>Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="bg-card text-card-foreground flex-1 border border-border rounded">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
