package com.recipes.springboot.RecipeGemini;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class RecipeGeminiApplication {

	public static void main(String[] args) {
		//Bootstrap the springboot
		SpringApplication.run(RecipeGeminiApplication.class, args);
	}

}
