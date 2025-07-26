import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Users, Star, ChefHat } from "lucide-react";
import { RecipeCard } from "./RecipeCard";
import { Recipe } from "./RecipeApp";

interface FavoriteRecipesProps {
  recipes: Recipe[];
  toggleFavorite: (id: string) => void;
}

export const FavoriteRecipes = ({ recipes, toggleFavorite }: FavoriteRecipesProps) => {
  const totalCookTime = recipes.reduce((acc, recipe) => acc + recipe.cookTime, 0);
  const avgRating = recipes.length > 0 
    ? Math.round((recipes.reduce((acc, recipe) => acc + recipe.rating, 0) / recipes.length) * 10) / 10 
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Favorite Recipes</span>
              <Heart className="h-4 w-4 text-destructive" />
            </div>
            <div className="text-2xl font-bold text-destructive">{recipes.length}</div>
            <p className="text-xs text-muted-foreground">Saved for later</p>
          </div>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Total Cook Time</span>
              <Clock className="h-4 w-4 text-recipe-warm" />
            </div>
            <div className="text-2xl font-bold text-recipe-warm">{totalCookTime}m</div>
            <p className="text-xs text-muted-foreground">Combined cooking</p>
          </div>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Average Rating</span>
              <Star className="h-4 w-4 text-recipe-warning" />
            </div>
            <div className="text-2xl font-bold text-recipe-warning">{avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </div>
        </Card>
      </div>

      {/* Favorite Recipes Grid */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={() => toggleFavorite(recipe.id)}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-card border-0 shadow-soft text-center py-16">
          <CardContent>
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-3">No favorite recipes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring recipes and click the heart icon to save your favorites. 
              They'll appear here for easy access later!
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                Discover recipes
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Save favorites
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Build collection
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};