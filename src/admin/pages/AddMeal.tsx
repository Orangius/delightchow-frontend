import { urlRoot } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
//const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

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
    })
    .gt(0, { message: "Price cannot be zero" }),
  category: z.string().min(2, {
    message: "Category must be provided",
  }),
  image: z
    .instanceof(FileList)
    // .refine((file) => file?.length == 1, "File is required."),
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

////// Start of Edit meal component
export function AddMeal() {
  ///// toast to display if there were errors or not
  const { toast } = useToast();

  const [isLoading, setIsloading] = useState(false);

  /////to navigate to the main page when the meal has been edited
  //const navigate = useNavigate();

  const AddMealForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      category: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.image[0]);

    let formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("price", values.price as unknown as string);
    formdata.append("category", values.category);
    formdata.append("file", values.image[0], values.image[0].name);
    //console.log("formData: ", formdata);
    // return;
    try {
      setIsloading(true);
      const response = await fetch(`${urlRoot}/api/admin/products`, {
        credentials: "include",
        method: "POST",
        body: formdata, //JSON.stringify(values),
      });
      setIsloading(false);
      if (!response.ok) {
        throw new Error("An error occured");
      } else {
        toast({
          description: "Meal added",
        });
        AddMealForm.reset({
          name: "",
          description: "",
          price: 0,
          category: "",
        });
        // navigate back to the meals page
        //navigate("..");
      }
    } catch (error) {
      toast({
        description: "An error occured, please try again",
      });
    }
  }
  // ...

  const fileRef = AddMealForm.register("image");

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-foreground font-bold text-2xl mb-4">
          Add new meal
        </h1>
        <Form {...AddMealForm}>
          <form
            onSubmit={AddMealForm.handleSubmit(onSubmit)}
            className="w-4/5  flex flex-col gap-4  px-20  pb-10"
          >
            <FormField
              control={AddMealForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Meal</FormLabel>
                  <FormControl>
                    <Input placeholder="Meal Name" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={AddMealForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Price (N)"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={AddMealForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={AddMealForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={AddMealForm.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Meal image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      {...fileRef}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <Button type="submit">Loading...</Button>
            ) : (
              <Button type="submit">Add meal</Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}

export default AddMeal;
