import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderInterface {
  orderId: string;
  orderStatus: string;
  date: string;
}

const OrderStatusSelect = ({
  item,
  updateOrderStatus,
}: {
  item: OrderInterface;
  updateOrderStatus: (value: string, orderId: string) => void;
}) => {
  return (
    <Select onValueChange={(value) => updateOrderStatus(value, item.orderId)}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder={item.orderStatus} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Out for delivery">Out for delivery</SelectItem>
        <SelectItem value="Delivered">Delivered</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;
