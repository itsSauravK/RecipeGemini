package com.recipes.springboot.RecipeGemini.service;

import com.recipes.springboot.RecipeGemini.model.Recipe;
import com.recipes.springboot.RecipeGemini.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    RecipeRepository recipeRepository;
    public List<Recipe> getAllRecipes(){
        Optional<List<Recipe>> recipesOptional = Optional.ofNullable(recipeRepository.findAll());
        return recipesOptional.orElse(new ArrayList<>());
    }

    public void addRecipe(Recipe recipe){
        recipeRepository.save(recipe);
    }

    public Recipe getRecipe(String id){
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.orElse(new Recipe());
    }
    public void deleteRecipe(String id){
        recipeRepository.deleteById(id);
    }
}
