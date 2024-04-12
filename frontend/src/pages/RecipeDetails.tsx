import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Recipe } from "./Home";
//Page to show recipe details
type RecipeDetail = {
  steps: string[];
} & Recipe;
const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetail>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/deleteRecipe`;
    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    navigate("/");
  };

  const getRecipeSteps = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/getRecipe`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const responseData = await response.json();
      setRecipe(responseData);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getRecipeSteps();
  }, []);
  return loading ? (
    <p>Loading ...</p>
  ) : (
    <div className="grid gap-4 lg:gap-8 items-start max-w-3xl px-4 mx-auto py-6">
      <div className="flex items-start gap-4">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold tracking-tighter">
            {recipe?.name}
          </h1>
        </div>
      </div>
      <div className="grid gap-4 text-sm leading-loose">
        <p>{recipe?.description}</p>
      </div>
      <h1 className="text-xl font-bold tracking-tighter text-center">Steps</h1>
      <div className="px-4 py-6 md:px-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="p-6">
            <ol className="list-decimal list-inside grid gap-4">
              {recipe?.steps &&
                recipe.steps.map((step, index) => (
                  <div className="space-y-2 my-4" key={index}>
                    <h3 className="text-sm">{step}</h3>
                    <p className="text-sm leading-none text-gray-500">
                      Step {index + 1}
                    </p>
                  </div>
                ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col gap-2">
        <Link
          to={`/`}
          className="inline-flex text-white h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        >
          <button type="button">Home Page</button>
        </Link>
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          type="button"
          onClick={handleDelete}
        >
          Delete Recipe
        </button>
        <Link
          to={`/updateRecipe/${id}`}
          className="inline-flex text-white h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        >
          <button type="button">Update Recipe</button>
        </Link>
      </div>
    </div>
  );
};
export default RecipeDetails;
