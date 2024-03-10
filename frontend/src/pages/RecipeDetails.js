import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
//Page to show recipe details
const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
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
            setRecipe(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
        
        setLoading(false);
    };
    
    useEffect(() => {
            getRecipeSteps();
        }, []);
    return (
        loading ? <p>Loading ...</p> :
            <div className="grid gap-4 lg:gap-8 items-start max-w-3xl px-4 mx-auto py-6">
                <div className="flex items-start gap-4">
                    <div className="grid gap-1">
                        <h1 className="text-3xl font-bold tracking-tighter">{recipe.name}</h1>
                    </div>
                </div>
                <div className="grid gap-4 text-sm leading-loose">
                    <p>
                        {recipe.description}
                    </p>
                </div>
                <h1 className="text-xl font-bold tracking-tighter text-center">Steps</h1>
                <div className="px-4 py-6 md:px-6">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="p-6">
                        <ol className="list-decimal list-inside grid gap-4">
                            {recipe.steps && recipe.steps.map((step, index) => (
                            <div className="space-y-2 my-4">
                                <h3 className="text-sm">{step}</h3>
                                <p className="text-sm leading-none text-gray-500">Step {index + 1}</p>
                            </div>
                            ))}
                        </ol>
                        </div>
                    </div>
                </div>

            </div>
    );
}
export default RecipeDetails;