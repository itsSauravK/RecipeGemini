import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ErrorBoundary from "./component/ErrorBoundary";
import "./index.css";
const Gemini = lazy(() => import("./pages/Gemini"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails.tsx"));
const UpdateRecipe = lazy(() => import("./pages/UpdateRecipe.tsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading</p>}>
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
      </Suspense>
    </Router>
  );
}

export default App;
