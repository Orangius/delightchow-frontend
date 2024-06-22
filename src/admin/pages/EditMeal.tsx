import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(0, {
    message: "Name must be provided",
  }),
  description: z.string().min(2, {
    message: "Description must be provided",
  }),
  price: z.coerce
    .number({
      required_error: "Price must be provided",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative({
      message: "Price cannot be negative",
    }),
  category: z.string().min(2, {
    message: "Category must be provided",
  }),
});

///declare the meal interface
interface Meal {
  name: string;
  description: string;
  price: string;
  category: string;
}

////// Start of Edit meal component
export function EditMeal() {
  //grab the food id from url param
  const urlParam = useParams().id;
  //meals state to store meals returned from the api call
  const [meal, setMeal] = useState<Meal>();
  ///// toast to display if there were errors or not
  const { toast } = useToast();

  /////to navigate to the main page when the meal has been edited
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(`${urlRoot}/api/admin/products/${urlParam}`);
      const meal = await response.json();
      setMeal(meal);
      console.log(meal);
    }
    fetchMeal();
  }, [urlParam]);

  console.log(urlParam);
  const editMealForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `${urlRoot}/api/admin/products/${urlParam}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      } else {
        toast({
          description: "Meal updated",
        });
        // navigate back to the meals page
        navigate("..");
      }
    } catch (error) {
      toast({
        description: "An error occured, please try again",
      });
    }
  }
  // ...

  return (
    <>
      <div className="flex flex-col  items-center justify-center mt-8">
        <h1 className="text-foreground font-bold text-2xl mb-4">Edit meal</h1>
        <Form {...editMealForm}>
          <form
            onSubmit={editMealForm.handleSubmit(onSubmit)}
            className="w-4/5  flex flex-col gap-4  px-20  pb-10"
          >
            <FormField
              control={editMealForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Meal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={meal ? meal.name : "Meal Name"}
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editMealForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Price (N)"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={meal ? meal.price : "Price"}
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editMealForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={meal ? meal.category : "Category"}
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editMealForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={meal ? meal.description : "Description"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default EditMeal;

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
