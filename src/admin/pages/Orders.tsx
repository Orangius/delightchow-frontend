import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface OrderInterface {
  order_id: string;
  order_status: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const result = await fetch(`${urlRoot}/api/admin/orders`);
      const orders = await result.json();
      setOrders(orders);
      setIsloading(false);
    }

    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <div>
      {!isLoading ? (
        <>
          <div className=" bg-card text-card-foreground my-5 mx-4  flex justify-between items-center min-h-20 border border-border rounded">
            <h2>Order ID</h2>
            <h2>status</h2>
          </div>

          <ul>
            {orders?.map((item: OrderInterface) => (
              <li key={item.order_id}>
                <Link to={`${"orders/"}${item.order_id}`}>
                  <div className=" bg-card text-card-foreground my-5 mx-4  flex justify-between items-center min-h-20 border border-border rounded">
                    <h2>{item.order_id}</h2>
                    <h2>{item.order_status}</h2>
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
