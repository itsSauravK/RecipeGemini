import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
const RecipeCard = ({name, id, description}) => {
    return (
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div class="p-6">
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {name}
                </h5>
                  <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {description}
                  </p>
              </div>
          <div class="p-6 pt-0">
            <button
              class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button">
              <Link to={`/recipe/${id}`}>View Recipe</Link>
            </button>
          </div>
        </div>
      );
}

export default RecipeCard;