import React, { useState } from 'react';
const AddRecipe = () => {
    const [steps, setSteps] = useState(['']); // Initial state with an empty step
    
        const handleChange = (index, value) => {
            const newSteps = [...steps];
            newSteps[index] = value;
            setSteps(newSteps);
        };
    
        const handleAddStep = () => {
            setSteps([...steps, '']); // Add a new empty step
        };
    
        const handleRemoveStep = (index) => {
            const newSteps = [...steps];
            newSteps.splice(index, 1); // Remove step at index
            setSteps(newSteps);
        };
    
        const handleSubmit = (event) => {
            event.preventDefault();
            // Now 'steps' contains all the recipe steps as a string array
            console.log('Recipe Steps:', steps);
        };
    return (
            <div>
                <h2>Recipe Form</h2>
                <form onSubmit={handleSubmit}>
                    {steps.map((step, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={step}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                            <button type="button" onClick={() => handleRemoveStep(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddStep}>
                        Add Step
                    </button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
}

export default AddRecipe;