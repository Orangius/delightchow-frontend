import { Button } from "@/components/ui/button";
import { urlRoot } from "@/lib/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const response = await fetch(`${urlRoot}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("logout successful");
        navigate("/api/admin/login");
      } else if (response.status === 401) {
        navigate("/api/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-2/3 flex flex-col gap-4 justify-center items-center py-4">
        <h3>Are you sure you want to log out?</h3>
        <div className="flex gap-4">
          <Button onClick={handleLogout}>Yes</Button>
          <Button>
            <Link to={"/api/admin"}>No</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
