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
          <div className=" bg-card text-card-foreground my-5 mx-4  flex justify-between items-center min-h-20 border border-border rounded">
            <h2>Name</h2>
            <h2>Price</h2>
            <p>Description</p>
          </div>

          <ul>
            {meals.map((item: Meal) => (
              <li key={item.food_id}>
                <Link to={`${"products/"}${item.food_id}`}>
                  <div className=" bg-card text-card-foreground my-5 mx-4  flex justify-between items-center min-h-20 border border-border rounded">
                    <h2>{item.name}</h2>
                    <h2>{item.price}</h2>
                    <p>{item.category}</p>
                  </div>
                </Link>
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
