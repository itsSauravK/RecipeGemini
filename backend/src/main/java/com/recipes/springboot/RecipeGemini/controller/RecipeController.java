package com.recipes.springboot.RecipeGemini.controller;

import com.recipes.springboot.RecipeGemini.model.Recipe;
import com.recipes.springboot.RecipeGemini.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.recipes.springboot.RecipeGemini.service.RecipeService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipe")

public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @PostMapping("/addRecipe")
    public void addRecipe(@RequestBody Recipe recipe){
        recipeService.addRecipe(recipe);
    }

    @PostMapping("/getRecipe")
    public Recipe getRecipe(@RequestBody Map<String, String> requestBody){
        return recipeService.getRecipe(requestBody.get("id"));
    }

    @GetMapping("/getAllRecipe")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @DeleteMapping("/deleteRecipe")
    public void deleteRecipe(@RequestBody Map<String, String> requestBody) {
         recipeService.deleteRecipe(requestBody.get("id"));
    }

    @PutMapping("/getRecipe")
    public Recipe updateRecipe(@RequestBody Recipe recipe){
        return recipeService.updateRecipe(recipe);
    }
}
