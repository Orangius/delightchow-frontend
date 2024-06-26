import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

interface OrderInterface {
  order_id: string;
  order_status: string;
  order_date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  // const [UpdatedStatus, setUpdatedStatus] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const result = await fetch(`${urlRoot}/api/orders`, {
        credentials: "include",
      });
      console.log(result.status);
      if (result.status === 401) navigate("/login");
      const orders = await result.json();

      if (result.ok) {
        setOrders(orders);
        setIsloading(false);
      }
    }

    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="bg-card text-card-foreground mx-4 my-4 grid grid-cols-4 text-left font-bold border-b">
            <h2>Order ID</h2>
            <h2>Date</h2>
            <h2>Time</h2>
            <h2>status</h2>
          </div>

          <ul className="flex flex-col">
            {orders?.map((item: OrderInterface) => (
              <li key={item.order_id}>
                <Link to={item.order_id}>
                  <div className="bg-card text-card-foreground mx-4 h-12 grid grid-cols-4 mb-4 text-left border-b">
                    <p>{`${item.order_id.substring(0, 8)}...`}</p>
                    <p>{format(new Date(item.order_date), "yyyy-MM-dd ")}</p>
                    <p>{format(new Date(item.order_date), "HH:mm")}</p>

                    {/* <OrderStatusSelect
                    item={item}
                    updateOrderStatus={updateOrderStatus}
                  /> */}
                    <p>{item.order_status}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Orders;
