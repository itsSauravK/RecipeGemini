package com.recipes.springboot.RecipeGemini.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("recipes")
@Getter
@Setter
@RequiredArgsConstructor

public class Recipe {

    private String name;
    private int timeInMinutes;
    private String steps[];

}
