import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Heart, Star, ChefHat, ShoppingCart, Calendar } from "lucide-react";
import { Recipe } from "./RecipeApp";

interface RecipeModalProps {
  recipe: Recipe;
  onToggleFavorite: () => void;
  onAddToMealPlan?: () => void;
  onAddToShoppingList?: () => void;
}

export const RecipeModal = ({ 
  recipe, 
  onToggleFavorite, 
  onAddToMealPlan, 
  onAddToShoppingList 
}: RecipeModalProps) => {
  const [servings, setServings] = useState(recipe.servings);

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

  const adjustIngredients = (ingredient: string, ratio: number) => {
    // Simple ingredient adjustment - in a real app, this would be more sophisticated
    const match = ingredient.match(/^(\d+(?:\.\d+)?)\s*(.+)/);
    if (match) {
      const amount = parseFloat(match[1]) * ratio;
      return `${amount % 1 === 0 ? amount : amount.toFixed(1)} ${match[2]}`;
    }
    return ingredient;
  };

  const servingRatio = servings / recipe.servings;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="transition-all duration-300">
          View Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recipe Image and Info */}
          <div className="space-y-4">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <Badge 
                className={`absolute top-3 right-3 ${getDifficultyColor(recipe.difficulty)}`}
              >
                {recipe.difficulty}
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground">{recipe.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-recipe-warm" />
                  {recipe.cookTime} min
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  {recipe.servings} servings
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-recipe-warning text-recipe-warning" />
                  {recipe.rating}
                </div>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline">{recipe.category}</Badge>
                <Badge variant={recipe.isFavorite ? "default" : "outline"}>
                  <Heart className={`h-3 w-3 mr-1 ${recipe.isFavorite ? 'fill-current' : ''}`} />
                  {recipe.isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button 
                variant={recipe.isFavorite ? "outline" : "default"}
                onClick={onToggleFavorite}
                className="w-full"
              >
                <Heart className={`h-4 w-4 mr-2 ${recipe.isFavorite ? 'fill-current' : ''}`} />
                {recipe.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  onClick={onAddToMealPlan}
                  className="w-full"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Plan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onAddToShoppingList}
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to List
                </Button>
              </div>
            </div>
          </div>

          {/* Ingredients and Instructions */}
          <div className="space-y-6">
            {/* Servings Adjuster */}
            <Card className="bg-gradient-card border-0">
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Adjust Servings
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setServings(Math.max(1, servings - 1))}
                  >
                    -
                  </Button>
                  <span className="font-semibold min-w-[3rem] text-center">{servings}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setServings(servings + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">servings</span>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="bg-gradient-card border-0">
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  Ingredients
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm">
                        {adjustIngredients(ingredient, servingRatio)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-gradient-card border-0">
              <CardHeader className="pb-3">
                <h3 className="font-semibold">Instructions</h3>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};