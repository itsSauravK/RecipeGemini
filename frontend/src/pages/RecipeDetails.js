import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
//Page to show recipe details
const RecipeDetails = () => {
    const { id } = useParams();
    const [recipeSteps, setRecipeSteps] = useState({});
    const [loading, setLoading] = useState(false);
    const getRecipeSteps = async () => {
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/getRecipe`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });   
            const responseData = await response.json();
            console.log(responseData);
            setRecipeSteps(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
        
        setLoading(false);
    };
    
    useEffect(() => {
            getRecipeSteps();
        }, []);
    return (
        <div>
            <h1>Recipe Details</h1>
            {loading ? <p>Loading ...</p> : <p>{recipeSteps.name}</p>}
        </div>
    );
}
export default RecipeDetails;