import { useEffect, useState } from "react";
import RecipeCard from "../component/RecipeCard";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getRecipes() {
        setLoading(true)
        const result = await fetch(`${process.env.REACT_APP_API_URL}/getAllRecipe`);
        const response = await result.json();
        setRecipes(response);
        setLoading(false);
    }
    useEffect(() => {
        getRecipes();
    }, []);
    return (
        <div>
            <h1>Recipes</h1>
            
            {loading ? <p>Loading ...</p> : recipes.map((recipe, index) => (
                <RecipeCard key={index} name={recipe.name} id={recipe.id} />
            ))}
        </div>
    );
    }

export default Home;