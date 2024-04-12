import RecipeCard from "../component/RecipeCard";
import { Link } from "react-router-dom";
import React from "react";
import { useGetDataFromEndpoint } from "../hooks/useGetDataFromEndpoint.tsx";
export type Recipe = {
  id: string;
  name: string;
  description: string;
};
const Home = () => {
  const { data, loading, error } = useGetDataFromEndpoint<Recipe[]>(
    `${process.env.REACT_APP_API_URL}/getAllRecipe`
  );
  return (
    <section className="w-full py-12 md:py-12 lg:py-24">
      <div>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Recipes</h2>
            <p className="mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Delicious recipes to inspire your next meal.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {loading ? (
              <p>Loading ...</p>
            ) : (
              data?.map((recipe, index) => (
                <>
                  <RecipeCard
                    key={index}
                    name={recipe.name}
                    id={recipe.id}
                    description={recipe.description}
                  />
                </>
              ))
            )}
          </div>

          <div className="flex justify-center">
            <Link to={`/generate`}>
              <button
                className="inline-flex text-white h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                type="button"
              >
                Generate Recipe
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
