import { useEffect, useState } from "react";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getRecipes() {
        setLoading(true)
        const result = await fetch(`${process.env.REACT_APP_API_URL}/getAllRecipe`);
        const response = await result.json();
        setRecipes(response);
        setLoading(false);
        console.log(recipes);
    }
    useEffect(() => {
        getRecipes();
    }, []);
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            {loading ? <p>Loading ...</p> : recipes.map((recipe, index) => (
                <div key={index}>
                    <p>{recipe.name}</p>
                </div>
            ))}
        </div>
    );
    }

export default Home;