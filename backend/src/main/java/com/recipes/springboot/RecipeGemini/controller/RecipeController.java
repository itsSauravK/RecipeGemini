package com.recipes.springboot.RecipeGemini.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class RecipeController {
    @GetMapping("/recipes")
    public String sayHello() {
        return "Hello word";
    }
}
