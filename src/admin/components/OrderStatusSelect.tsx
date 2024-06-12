import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderInterface {
  order_id: string;
  order_status: string;
  order_date: string;
}

const OrderStatusSelect = ({
  item,
  updateOrderStatus,
}: {
  item: OrderInterface;
  updateOrderStatus: (value: string, orderId: string) => void;
}) => {
  return (
    <Select onValueChange={(value) => updateOrderStatus(value, item.order_id)}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder={item.order_status} />
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
