import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSubmit = async () => {
        console.log("submitting");
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}/getRecipe`;
        try {
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, name: recipe.name, description: recipe.description, steps: recipe.steps}),
            });
        } catch (error) {
            console.error('Error:', error);
        }
        navigate(`/recipe/${id}`)
        setLoading(false);
    };
    
    const handleNameChange = (event) => {
        setRecipe({
            ...recipe,
            name: event.target.value
        });
   };
        
    const handleDescriptionChange = (event) => {
        setRecipe({
          ...recipe,
            description: event.target.value
        });
    };
        
    const handleStepChange = (index, event) => {
        const newSteps = [...recipe.steps];
        newSteps[index] = event.target.value;
        setRecipe({
        ...recipe,
        steps: newSteps
      });
    };
        
    const handleAddStep = () => {
        setRecipe({
          ...recipe,
          steps: [...recipe.steps, ""]
        });
    };
        
    const handleDeleteStep = (index) => {
        const newSteps = [...recipe.steps];
        newSteps.splice(index, 1);
        setRecipe({
         ...recipe,
         steps: newSteps
        });
    };
    
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
            <div className="min-h-screen flex flex-col items-center bg-gray-100">
              <div className="text-4xl font-bold mt-12 mb-6">Update Recipe</div>
                {recipe.name && (
                  <div className="w-full max-w-md border border-black rounded p-4">
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2 text-lg font-bold">Name:</label>
                      <input
                        type="text"
                        value={recipe.name}
                        onChange={handleNameChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none text-sm"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="description" className="block mb-2 text-lg font-bold">Description:</label>
                      <textarea
                        value={recipe.description}
                        onChange={handleDescriptionChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md resize-vertical focus:outline-none text-sm"
                        rows="4"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">Steps:</h3>
                      {recipe.steps.map((step, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => handleStepChange(index, e)}
                            className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none text-sm"
                          />
                          <button
                            onClick={() => handleDeleteStep(index)}
                            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            -
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddStep}
                        className="bg-black hover:bg-gray-900 text-white font-bold py-1 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Button to submit changes */}
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </div>
                )}
            </div>
        );
}

export default UpdateRecipe;