package com.recipes.springboot.RecipeGemini.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("recipes")
@Getter
@Setter
public class Recipe {

    @Id
    private String id;
    @JsonProperty(value="name")
    private String name;
    @JsonProperty(value="steps")
    private List<String> steps;

    public Recipe(){}

    public Recipe(String name, List<String> steps){
        super();
        this.name = name;
        this.steps = steps;
    }

}
