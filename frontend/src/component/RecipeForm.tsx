import React from "react";
import { RecipeDetail } from "../pages/RecipeDetails";
type RecipeFormProps = {
  recipe: RecipeDetail;
  handleNameChange: (event: any) => void;
  handleDescriptionChange: (event: any) => void;
  handleStepChange: (index: any, event: any) => void;
  handleAddStep: () => void;
  handleDeleteStep: (index: any) => void;
  handleSubmit: () => Promise<void>;
};
export const RecipeForm = ({
  recipe,
  handleNameChange,
  handleDescriptionChange,
  handleStepChange,
  handleDeleteStep,
  handleAddStep,
  handleSubmit,
}: RecipeFormProps) => {
  return (
    <div className="w-full max-w-md border border-black rounded p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-lg font-bold">
          Name:
        </label>
        <input
          type="text"
          value={recipe.name}
          onChange={handleNameChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 text-lg font-bold">
          Description:
        </label>
        <textarea
          value={recipe.description}
          onChange={handleDescriptionChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md resize-vertical focus:outline-none text-sm"
          rows={5}
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Steps:</h3>
        {recipe.steps?.map((step, index) => (
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
  );
};
