import { useState } from "react";
import { AddRecipeModal } from "./AddRecipeModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Trash2, Clock, Users } from "lucide-react";
import { Recipe } from "./RecipeApp";

interface MealPlan {
  id: string;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
}

interface MealPlannerProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['breakfast', 'lunch', 'dinner'] as const;

export const MealPlanner = ({ recipes, onAddRecipe }: MealPlannerProps) => {
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([
    {
      id: '1',
      date: 'Monday',
      meal: 'breakfast',
      recipe: recipes.find(r => r.category === 'Breakfast') || recipes[0]
    },
    {
      id: '2',
      date: 'Monday',
      meal: 'lunch',
      recipe: recipes.find(r => r.category === 'Healthy') || recipes[1]
    },
    {
      id: '3',
      date: 'Tuesday',
      meal: 'dinner',
      recipe: recipes.find(r => r.category === 'Asian') || recipes[2]
    }
  ]);

  const [selectedWeek, setSelectedWeek] = useState('Current Week');

  const getMealsForDay = (day: string) => {
    return mealPlan.filter(meal => meal.date === day);
  };

  const addMealToDay = (day: string, mealType: typeof MEALS[number]) => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const newMeal: MealPlan = {
      id: Date.now().toString(),
      date: day,
      meal: mealType,
      recipe: randomRecipe
    };
    setMealPlan([...mealPlan, newMeal]);
  };

  const removeMeal = (mealId: string) => {
    setMealPlan(mealPlan.filter(meal => meal.id !== mealId));
  };

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'bg-recipe-warning text-white';
      case 'lunch':
        return 'bg-recipe-success text-white';
      case 'dinner':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const totalCookTime = mealPlan.reduce((acc, meal) => acc + meal.recipe.cookTime, 0);
  const totalServings = mealPlan.reduce((acc, meal) => acc + meal.recipe.servings, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned Meals</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mealPlan.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cook Time</CardTitle>
            <Clock className="h-4 w-4 text-recipe-warm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-recipe-warm">{totalCookTime}m</div>
            <p className="text-xs text-muted-foreground">Weekly cooking</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Servings</CardTitle>
            <Users className="h-4 w-4 text-recipe-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-recipe-success">{totalServings}</div>
            <p className="text-xs text-muted-foreground">Planned portions</p>
          </CardContent>
        </Card>
      </div>

      {/* Week Selector */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Meal Plan - {selectedWeek}
            </CardTitle>
            <Button variant="outline" size="sm">
              Generate Plan
            </Button>
            <AddRecipeModal onAddRecipe={onAddRecipe} />
          </div>
        </CardHeader>
      </Card>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {DAYS.map((day, dayIndex) => (
          <Card key={day} className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-center">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MEALS.map((mealType) => {
                const meal = getMealsForDay(day).find(m => m.meal === mealType);
                return (
                  <div key={mealType} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getMealTypeColor(mealType)}`}
                      >
                        {mealType}
                      </Badge>
                      {!meal && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addMealToDay(day, mealType)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    {meal ? (
                      <div 
                        className="p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 animate-slide-up group"
                        style={{ animationDelay: `${dayIndex * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm font-medium line-clamp-2">{meal.recipe.title}</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMeal(meal.id)}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {meal.recipe.cookTime}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {meal.recipe.servings}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-muted/30 border-2 border-dashed border-muted-foreground/20 text-center">
                        <p className="text-xs text-muted-foreground">No meal planned</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Next Week</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Add Recipe</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Prep Times</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Adjust Servings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};