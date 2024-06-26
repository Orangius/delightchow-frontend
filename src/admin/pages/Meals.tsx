import { Button } from "@/components/ui/button";
import { urlRoot } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Meal {
  food_id: number;
  name: string;
  price: number;
  category: string;
  imageURL: string;
}

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMeals() {
      const result = await fetch(`${urlRoot}/api/products`, {
        credentials: "include",
      });
      if (result.status === 401) {
        console.log(result);
        return navigate("/login");
      }

      if (result.ok) {
        const meals = await result.json();
        console.log(meals);
        setMeals(meals);
        setisLoading(false);
      }
    }

    fetchMeals();
  }, []);

  console.log(meals);
  return (
    <div className="mt-10">
      <div className="bg-card text-card-foreground mx-4 my-4 grid grid-cols-5 text-left font-bold border-b static">
        <h2></h2>
        <h2>Name</h2>
        <h2>Price</h2>
        <p>Description</p>
        <Button className="bg-primary w-32 absolute text-xl top-[20px] right-5 cursor-pointer">
          <Link to={"add-meal"}>+ New</Link>
        </Button>
      </div>
      {!isLoading ? (
        <>
          <ul>
            {meals.map((item: Meal) => (
              <li key={item.food_id}>
                <div className="bg-card text-card-foreground mx-4 h-12 grid grid-cols-5 my-4 pb-16 text-left border-b place-items-center justify-items-start">
                  <img
                    className="inline-block size-[46px] rounded-full"
                    src={item.imageURL}
                    alt="Logo"
                  />
                  <p>{item.name}</p>
                  <p>{`N${item.price}`}</p>
                  <p>{item.category}</p>
                  <Button className="w-20 bg-secondary">
                    <Link to={`${"products/"}${item.food_id}`}>Edit</Link>
                  </Button>
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

export default Meals;
