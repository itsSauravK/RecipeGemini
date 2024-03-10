import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
const RecipeCard = ({name, id}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description to come
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
              <Button size="small">Learn the Recipe</Button>
            </Link>
          </CardActions>
        </Card>
      );
}

export default RecipeCard;