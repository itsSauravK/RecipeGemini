import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Gemini from './pages/Gemini';
import RecipeDetails from './pages/RecipeDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/generate" element={<Gemini />} />
      </Routes>
    </Router>
  );
}

export default App;
