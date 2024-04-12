import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gemini from "./pages/Gemini";
import RecipeDetails from "./pages/RecipeDetails";
import UpdateRecipe from "./pages/UpdateRecipe";
import ErrorBoundary from "./component/ErrorBoundary";
import "./index.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
              <Home />
            </ErrorBoundary>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/updateRecipe/:id" element={<UpdateRecipe />} />
        <Route path="/generate" element={<Gemini />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
