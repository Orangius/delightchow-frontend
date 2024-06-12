import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Meal {
  food_id: number;
  name: string;
  price: number;
  category: string;
}

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    async function fetchMeals() {
      const result = await fetch("http://localhost:4000/api/admin/products");
      const meals = await result.json();
      setMeals(meals);
      setisLoading(false);
    }

    fetchMeals();
  }, []);

  console.log(meals);
  return (
    <div>
      {!isLoading ? (
        <>
          <div className="bg-card text-card-foreground mx-4 my-4 grid grid-cols-4 text-left font-bold border-b">
            <h2>Name</h2>
            <h2>Price</h2>
            <p>Description</p>
            <h2></h2>
          </div>

          <ul>
            {meals.map((item: Meal) => (
              <li key={item.food_id}>
                <div className="bg-card text-card-foreground mx-4 h-12 grid grid-cols-4 mb-4 text-left border-b">
                  <p>{item.name}</p>
                  <p>{`N${item.price}`}</p>
                  <p>{item.category}</p>
                  <Button className="w-20 bg-primary">
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
