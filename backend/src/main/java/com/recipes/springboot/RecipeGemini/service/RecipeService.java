package com.recipes.springboot.RecipeGemini.service;

import com.recipes.springboot.RecipeGemini.model.Recipe;
import com.recipes.springboot.RecipeGemini.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<String> res = new ArrayList<>();
        recipeRepository.save(recipe);
    }
}
