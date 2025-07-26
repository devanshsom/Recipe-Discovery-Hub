import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeModal } from "./RecipeModal";
import { Clock, Users, Heart, Star } from "lucide-react";
import { Recipe } from "./RecipeApp";

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: () => void;
  onAddToMealPlan?: () => void;
  onAddToShoppingList?: () => void;
  animationDelay?: number;
}

export const RecipeCard = ({ recipe, onToggleFavorite, onAddToMealPlan, onAddToShoppingList, animationDelay = 0 }: RecipeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-recipe-success text-white';
      case 'Medium':
        return 'bg-recipe-warning text-white';
      case 'Hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card 
      className="bg-gradient-card border-0 shadow-soft hover:shadow-recipe transition-all duration-300 transform hover:scale-105 animate-slide-up overflow-hidden group"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-secondary flex items-center justify-center relative overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Favorite button */}
          <Button
            size="sm"
            variant="secondary"
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              recipe.isFavorite ? 'bg-destructive text-destructive-foreground' : 'bg-white/80 text-muted-foreground'
            }`}
            onClick={onToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${recipe.isFavorite ? 'fill-current' : ''}`} />
          </Button>

          {/* Difficulty badge */}
          <Badge 
            className={`absolute top-3 left-3 ${getDifficultyColor(recipe.difficulty)}`}
          >
            {recipe.difficulty}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">{recipe.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-recipe-warning text-recipe-warning" />
            {recipe.rating}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.cookTime} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} servings
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {recipe.category}
          </Badge>
          <RecipeModal
            recipe={recipe}
            onToggleFavorite={onToggleFavorite}
            onAddToMealPlan={onAddToMealPlan}
            onAddToShoppingList={onAddToShoppingList}
          />
        </div>
      </CardContent>
    </Card>
  );
};