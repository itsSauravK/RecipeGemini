import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import RecipeDetails, { RecipeDetail } from "./RecipeDetails";
import { RecipeForm } from "../component/RecipeForm";

const UpdateRecipe = () => {
  const location = useLocation();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetail>(location.state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/getRecipe`;
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: recipe?.name,
          description: recipe?.description,
          steps: recipe?.steps,
        }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    navigate(`/recipe/${id}`);
    setLoading(false);
  };

  const handleNameChange = (event) => {
    const obj = {
      ...recipe,
      name: event.target.value,
    };
    setRecipe(obj);
  };

  const handleDescriptionChange = (event) => {
    setRecipe({
      ...recipe,
      description: event.target.value,
    });
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...(recipe?.steps ?? [])];
    newSteps[index] = event.target.value;
    setRecipe({
      ...recipe,
      steps: newSteps,
    });
  };

  const handleAddStep = () => {
    setRecipe({
      ...recipe,
      steps: [...(recipe?.steps ?? [])],
    });
  };

  const handleDeleteStep = (index) => {
    const newSteps = [...(recipe?.steps ?? [])];
    newSteps.splice(index, 1);
    setRecipe({
      ...recipe,
      steps: newSteps,
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="text-4xl font-bold mt-12 mb-6">Update Recipe</div>
      <RecipeForm
        recipe={recipe}
        handleNameChange={handleNameChange}
        handleDescriptionChange={handleDescriptionChange}
        handleStepChange={handleStepChange}
        handleAddStep={handleAddStep}
        handleDeleteStep={handleDeleteStep}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateRecipe;
