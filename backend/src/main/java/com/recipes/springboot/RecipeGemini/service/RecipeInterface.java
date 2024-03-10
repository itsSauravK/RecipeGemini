package com.recipes.springboot.RecipeGemini.service;

import com.recipes.springboot.RecipeGemini.model.Recipe;

import java.util.List;

public interface RecipeInterface {
    public List<Recipe> getAllRecipes();
    public void addRecipe(Recipe recipe);

    public Recipe getRecipe(String id);

    public void deleteRecipe(String id);

    public Recipe updateRecipe(Recipe recipe);
}
