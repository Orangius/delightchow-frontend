import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./users/Homepage";
import DashboardLayout from "./admin/components/DashboardLayout";
// import Products from "@/admin/components/Products.tsx";

import Orders from "./admin/pages/Orders";
import Meals from "./admin/pages/Meals";
import Settings from "./admin/pages/Settings";
import Logout from "./admin/pages/Logout";
import Meal from "./admin/pages/Meal";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Meals />} />
          <Route path="products/:id" element={<Meal />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
