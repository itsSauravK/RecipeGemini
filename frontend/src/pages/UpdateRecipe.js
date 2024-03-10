import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const UpdateRecipe = () => {
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
            <div>
                <h1>Update Recipe</h1>
            </div>
        );
}

export default UpdateRecipe;