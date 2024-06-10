import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Meal {
  food_id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

const MealPage = () => {
  const mealId = useParams();

  const [meal, setMeals] = useState<Meal>();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      const result = await fetch(
        `http://localhost:4000/api/admin/products/${mealId.id}`
      );
      const meals = await result.json();
      setMeals(meals);
      setisLoading(false);
    }

    fetchMeals();
  }, []);

  console.log(meal);

  return (
    <div>
      <h1>{meal?.name}</h1>
      <h2>{meal?.category}</h2>
      <h2>{meal?.price}</h2>
      <h2>{meal?.description}</h2>
      <button> Edit meal</button>
    </div>
  );
};

export default MealPage;
