package com.recipes.springboot.RecipeGemini.repository;

import com.recipes.springboot.RecipeGemini.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
    @Query(value = "{}", fields="{'id' : 1, 'name' : 1}")
    List<Recipe> findAll();
    long count();
}
