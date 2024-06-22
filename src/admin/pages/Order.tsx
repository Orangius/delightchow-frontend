import { toast } from "@/components/ui/use-toast";
import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusSelect from "../components/OrderStatusSelect";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
interface OrderInterface {
  surname: string;
  lastname: string;
  address: string;
  phone: string;

  orderId: string;
  orderStatus: string;
  date: string;

  mealName: string;
  mealPrice: number;
  mealQuantity: number;
  mealId: number;
}

const Order = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<OrderInterface[]>();
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMealdata() {
      try {
        const response = await fetch(`${urlRoot}/api/admin/orders/${id}`);
        const meal = await response.json();
        setOrderData(meal);
        //setLoading(false);
        console.log(meal);
      } catch (error) {}
    }
    fetchMealdata();
  }, []);

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
    <>
      {orderData ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-foreground font-bold text-2xl my-4">
            Order details
          </h1>
          <div className="bg-popover w-4/5 grid grid-cols-1 mb-4 rounded-md px-4 py-4">
            <div className="flex justify-between">
              <h3 className="font-bold">Name</h3>
              <p>{`${orderData[0].surname} ${orderData[0].lastname}`}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="font-bold">Phone</h3>
              <p>{`${orderData[0].phone}`}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="font-bold">Address</h3>
              <p>{`${orderData[0].address}`}</p>
            </div>
          </div>
          <div className="w-4/5 bg-popover rounded-md px-4 py-4">
            <div className=" flex justify-between">
              <div>
                <h3 className="font-bold">Meal name</h3>
              </div>
              <div>
                <h3 className="font-bold">Quantity</h3>
              </div>
              <div>
                <h3 className="font-bold">Price</h3>
              </div>
            </div>
            <Separator className="w-full" />
            {orderData.map((order: OrderInterface) => (
              <div className="flex justify-between mb-4" key={order.mealId}>
                <h2>{order.mealName}</h2>

                <h2>{order.mealQuantity}</h2>
                <h2>{order.mealPrice}</h2>
              </div>
            ))}
          </div>

          <div className="bg-popover w-4/5 grid grid-cols-1 mt-4 rounded-md px-4 py-4">
            <div className="flex justify-between">
              <h3 className="font-bold">Order ID</h3>
              <p>{orderData[0].orderId}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-bold">Order date</h2>
              <p>{format(new Date(orderData[0].date), "yyyy-MM-dd ")}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-bold">Order time</h2>
              <p>{format(new Date(orderData[0].date), "HH-mm")}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-bold">Order status</h2>
              <OrderStatusSelect
                item={orderData[0]}
                updateOrderStatus={updateOrderStatus}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Order;
