import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/components/ui/use-toast";
import OrderStatusSelect from "../components/OrderStatusSelect";

interface OrderInterface {
  order_id: string;
  order_status: string;
  order_date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>();
  const [isLoading, setIsloading] = useState(true);

  // const [UpdatedStatus, setUpdatedStatus] = useState(false);
  const { toast } = useToast();

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

  const updateOrderStatus = async (value: string, orderId: string) => {
    try {
      const response = await fetch(`${urlRoot}/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: value }),
      });

      if (!response.ok) {
        throw new Error("An error occured");
      } else {
        console.log("Updated");
        // make that toast display here
        // notify("Order status updated");
        toast({
          description: "Status updated",
        });
      }
    } catch (error) {
      console.log("error: ", error);
      toast({
        description: "An error occured, try again",
      });
    }
  };
  return (
    <div>
      <Toaster />
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
                <div className="bg-card text-card-foreground mx-4 h-12 grid grid-cols-4 mb-4 text-left border-b">
                  <p>{item.order_id}</p>
                  <p>{format(new Date(item.order_date), "yyyy-MM-dd ")}</p>
                  <p>{format(new Date(item.order_date), "HH:mm")}</p>

                  <OrderStatusSelect
                    item={item}
                    updateOrderStatus={updateOrderStatus}
                  />
                  {/* <p>{item.order_status}</p> */}
                </div>
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
