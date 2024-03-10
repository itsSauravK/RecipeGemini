import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Gemini from './pages/Gemini';
import RecipeDetails from './pages/RecipeDetails';
import UpdateRecipe from './pages/UpdateRecipe';
import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path='/updateRecipe/:id' element={<UpdateRecipe />} />
        <Route path="/generate" element={<Gemini />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
