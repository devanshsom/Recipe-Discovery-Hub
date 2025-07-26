import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Clock, 
  Users, 
  ChefHat, 
  Heart, 
  Star,
  Calendar,
  ShoppingCart,
  Filter,
  Bookmark
} from "lucide-react";
import { RecipeCard } from "./RecipeCard";
import { MealPlanner } from "./MealPlanner";
import { ShoppingList } from "./ShoppingList";
import { FavoriteRecipes } from "./FavoriteRecipes";
import { AddRecipeModal } from "./AddRecipeModal";
import { useToast } from "@/components/ui/use-toast";

const FEATURED_RECIPES = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    description: 'Fresh quinoa bowl with roasted vegetables, feta, and lemon dressing',
    image: '/placeholder.svg',
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    category: 'Healthy',
    isFavorite: false,
    ingredients: ['quinoa', 'cherry tomatoes', 'cucumber', 'feta cheese', 'olive oil'],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Mix dressing', 'Combine all ingredients']
  },
  {
    id: '2',
    title: 'Spicy Thai Chicken Curry',
    description: 'Aromatic coconut curry with tender chicken and vibrant vegetables',
    image: '/placeholder.svg',
    cookTime: 35,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.9,
    category: 'Asian',
    isFavorite: true,
    ingredients: ['chicken', 'coconut milk', 'red curry paste', 'vegetables'],
    instructions: ['Prepare ingredients', 'Cook chicken', 'Add curry paste', 'Simmer with coconut milk']
  },
  {
    id: '3',
    title: 'Classic Margherita Pizza',
    description: 'Traditional Italian pizza with fresh basil, mozzarella, and tomato sauce',
    image: '/placeholder.svg',
    cookTime: 40,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.7,
    category: 'Italian',
    isFavorite: false,
    ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'fresh basil'],
    instructions: ['Prepare dough', 'Add sauce', 'Top with cheese', 'Bake until crispy']
  },
  {
    id: '4',
    title: 'Chocolate Lava Cake',
    description: 'Decadent individual chocolate cakes with molten centers',
    image: '/placeholder.svg',
    cookTime: 20,
    servings: 4,
    difficulty: 'Hard',
    rating: 4.6,
    category: 'Dessert',
    isFavorite: true,
    ingredients: ['dark chocolate', 'butter', 'eggs', 'flour', 'sugar'],
    instructions: ['Melt chocolate', 'Mix batter', 'Fill ramekins', 'Bake until just set']
  },
  {
    id: '5',
    title: 'Avocado Toast Supreme',
    description: 'Gourmet avocado toast with poached egg and everything seasoning',
    image: '/placeholder.svg',
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.5,
    category: 'Breakfast',
    isFavorite: false,
    ingredients: ['sourdough bread', 'avocado', 'eggs', 'everything seasoning'],
    instructions: ['Toast bread', 'Mash avocado', 'Poach eggs', 'Assemble and season']
  },
  {
    id: '6',
    title: 'Beef Bulgogi Bowl',
    description: 'Korean-style marinated beef with steamed rice and vegetables',
    image: '/placeholder.svg',
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.8,
    category: 'Asian',
    isFavorite: true,
    ingredients: ['beef sirloin', 'soy sauce', 'sesame oil', 'rice', 'vegetables'],
    instructions: ['Marinate beef', 'Cook rice', 'Stir-fry beef', 'Serve with vegetables']
  }
];

const CATEGORIES = ['All', 'Healthy', 'Asian', 'Italian', 'Dessert', 'Breakfast', 'Quick'];

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: string;
  rating: number;
  category: string;
  isFavorite: boolean;
  ingredients: string[];
  instructions: string[];
}

export const RecipeApp = () => {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>(FEATURED_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeView, setActiveView] = useState<'discover' | 'planner' | 'favorites' | 'shopping'>('discover');

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(recipe => {
      if (recipe.id === id) {
        const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
        toast({
          title: updatedRecipe.isFavorite ? "Added to favorites!" : "Removed from favorites",
          description: updatedRecipe.isFavorite 
            ? `${recipe.title} has been saved to your favorites` 
            : `${recipe.title} has been removed from favorites`,
          duration: 2000,
        });
        return updatedRecipe;
      }
      return recipe;
    }));
  };

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes([newRecipe, ...recipes]);
    toast({
      title: "Recipe added!",
      description: `${newRecipe.title} has been added to your collection`,
      duration: 3000,
    });
  };

  const addToMealPlan = (recipe: Recipe) => {
    toast({
      title: "Added to meal plan!",
      description: `${recipe.title} has been added to your meal planner`,
      duration: 2000,
    });
  };

  const addToShoppingList = (recipe: Recipe) => {
    toast({
      title: "Added to shopping list!",
      description: `Ingredients for ${recipe.title} have been added to your shopping list`,
      duration: 2000,
    });
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderView = () => {
    switch (activeView) {
      case 'planner':
        return <MealPlanner recipes={recipes} onAddRecipe={addRecipe} />;
      case 'favorites':
        return <FavoriteRecipes recipes={recipes.filter(r => r.isFavorite)} toggleFavorite={toggleFavorite} />;
      case 'shopping':
        return <ShoppingList recipes={recipes} />;
      default:
        return <DiscoverView 
          recipes={filteredRecipes} 
          toggleFavorite={toggleFavorite}
          addToMealPlan={addToMealPlan}
          addToShoppingList={addToShoppingList}
          onAddRecipe={addRecipe}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-recipe-neutral to-secondary">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-recipe">
              <ChefHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Recipe Discovery Hub
              </h1>
              <p className="text-muted-foreground">Discover, plan, and cook amazing meals</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 flex-wrap mb-6">
            <Button
              variant={activeView === 'discover' ? 'default' : 'outline'}
              onClick={() => setActiveView('discover')}
              className="transition-all duration-300"
            >
              <Search className="h-4 w-4 mr-2" />
              Discover
            </Button>
            <Button
              variant={activeView === 'planner' ? 'default' : 'outline'}
              onClick={() => setActiveView('planner')}
              className="transition-all duration-300"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Meal Planner
            </Button>
            <Button
              variant={activeView === 'favorites' ? 'default' : 'outline'}
              onClick={() => setActiveView('favorites')}
              className="transition-all duration-300"
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
            <Button
              variant={activeView === 'shopping' ? 'default' : 'outline'}
              onClick={() => setActiveView('shopping')}
              className="transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shopping List
            </Button>
          </div>

          {/* Search and Filters - Only show on discover view */}
          {activeView === 'discover' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes, ingredients, or cuisine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="animate-slide-up">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

const DiscoverView = ({ 
  recipes, 
  toggleFavorite, 
  addToMealPlan, 
  addToShoppingList, 
  onAddRecipe 
}: { 
  recipes: Recipe[], 
  toggleFavorite: (id: string) => void,
  addToMealPlan: (recipe: Recipe) => void,
  addToShoppingList: (recipe: Recipe) => void,
  onAddRecipe: (recipe: Recipe) => void
}) => (
  <div className="space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-recipe transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
          <ChefHat className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{recipes.length}</div>
          <p className="text-xs text-muted-foreground">Available to cook</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-recipe transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Cook Time</CardTitle>
          <Clock className="h-4 w-4 text-recipe-warm" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-recipe-warm">
            {Math.round(recipes.reduce((acc, recipe) => acc + recipe.cookTime, 0) / recipes.length)}m
          </div>
          <p className="text-xs text-muted-foreground">Minutes per recipe</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-recipe transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorites</CardTitle>
          <Heart className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {recipes.filter(r => r.isFavorite).length}
          </div>
          <p className="text-xs text-muted-foreground">Saved recipes</p>
        </CardContent>
      </Card>
    </div>

    {/* Add Recipe Button */}
    <div className="flex justify-center mb-6">
      <AddRecipeModal onAddRecipe={onAddRecipe} />
    </div>

    {/* Recipe Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={() => toggleFavorite(recipe.id)}
          onAddToMealPlan={() => addToMealPlan(recipe)}
          onAddToShoppingList={() => addToShoppingList(recipe)}
          animationDelay={index * 0.1}
        />
      ))}
    </div>

    {recipes.length === 0 && (
      <Card className="bg-gradient-card border-0 shadow-soft text-center py-12">
        <CardContent>
          <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </CardContent>
      </Card>
    )}
  </div>
);