import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(0, {
    message: "Name must be provided",
  }),
  description: z.string().min(2, {
    message: "Description must be provided",
  }),
  price: z.string().min(2, {
    message: "Price must be provided",
  }),
  category: z.string().min(2, {
    message: "Category must be provided",
  }),
});

export function EditMeal() {
  const editMealForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
    },
  });
  // ...

  return (
    <Form {...editMealForm}>
      <form
        onSubmit={editMealForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={editMealForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// interface Meal {
//   food_id: number;
//   name: string;
//   price: number;
//   category: string;
//   description: string;
// }

// const MealPage = () => {
//   const mealId = useParams();

//   const [meal, setMeals] = useState<Meal>();
//   const [isLoading, setisLoading] = useState(true);

//   useEffect(() => {
//     async function fetchMeals() {
//       const result = await fetch(`${urlRoot}/api/admin/products/${mealId.id}`);
//       const meals = await result.json();
//       setMeals(meals);
//       setisLoading(false);
//     }

//     fetchMeals();
//   }, []);

//   console.log(meal);

//   return (
//     <>
//       {!isLoading ? (
//         <div>
//           <h1>{meal?.name}</h1>
//           <h2>{meal?.category}</h2>
//           <h2>{meal?.price}</h2>
//           <h2>{meal?.description}</h2>
//           <button> Edit meal</button>
//         </div>
//       ) : (
//         <h2>Loading</h2>
//       )}
//     </>
//   );
// };

// export default MealPage;
