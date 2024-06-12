import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ProportionsIcon } from "lucide-react";

export default function ToastSimple() {
  const { toast } = useToast();

  console.log(ProportionsIcon);

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "message",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
