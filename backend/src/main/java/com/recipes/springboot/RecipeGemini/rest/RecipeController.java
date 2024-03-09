package com.recipes.springboot.RecipeGemini.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {
    @GetMapping("/")
    public String sayHello() {
        return "Hello word";
    }
}
