package com.recipes.springboot.RecipeGemini.controller;

import com.recipes.springboot.RecipeGemini.model.Recipe;
import com.recipes.springboot.RecipeGemini.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.recipes.springboot.RecipeGemini.service.RecipeService;
import java.util.List;

@RestController
@RequestMapping("/api/recipe")

public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @PostMapping("/addRecipe")
    public void addRecipe(@RequestBody Recipe recipe){
        recipeService.addRecipe(recipe);
    }
    @GetMapping("/getAllRecipe")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }
}
