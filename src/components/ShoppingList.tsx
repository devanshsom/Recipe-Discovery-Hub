import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Plus, Trash2, Check, X } from "lucide-react";
import { Recipe } from "./RecipeApp";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: 'produce' | 'dairy' | 'meat' | 'pantry' | 'spices' | 'other';
  completed: boolean;
  fromRecipe?: string;
}

const INITIAL_ITEMS: ShoppingItem[] = [
  { id: '1', name: 'Quinoa', quantity: '2 cups', category: 'pantry', completed: false, fromRecipe: 'Mediterranean Quinoa Bowl' },
  { id: '2', name: 'Cherry Tomatoes', quantity: '1 lb', category: 'produce', completed: true, fromRecipe: 'Mediterranean Quinoa Bowl' },
  { id: '3', name: 'Feta Cheese', quantity: '8 oz', category: 'dairy', completed: false, fromRecipe: 'Mediterranean Quinoa Bowl' },
  { id: '4', name: 'Chicken Breast', quantity: '2 lbs', category: 'meat', completed: false, fromRecipe: 'Spicy Thai Chicken Curry' },
  { id: '5', name: 'Coconut Milk', quantity: '2 cans', category: 'pantry', completed: false, fromRecipe: 'Spicy Thai Chicken Curry' },
  { id: '6', name: 'Red Curry Paste', quantity: '1 jar', category: 'spices', completed: false, fromRecipe: 'Spicy Thai Chicken Curry' },
  { id: '7', name: 'Avocados', quantity: '4 ripe', category: 'produce', completed: false, fromRecipe: 'Avocado Toast Supreme' },
  { id: '8', name: 'Sourdough Bread', quantity: '1 loaf', category: 'pantry', completed: false, fromRecipe: 'Avocado Toast Supreme' },
];

const CATEGORY_COLORS = {
  produce: 'bg-recipe-success text-white',
  dairy: 'bg-recipe-cool text-white',
  meat: 'bg-destructive text-destructive-foreground',
  pantry: 'bg-recipe-warning text-white',
  spices: 'bg-primary text-primary-foreground',
  other: 'bg-secondary text-secondary-foreground',
};

const CATEGORY_ICONS = {
  produce: '🥬',
  dairy: '🥛',
  meat: '🥩',
  pantry: '🏺',
  spices: '🌶️',
  other: '📦',
};

export const ShoppingList = ({ recipes }: { recipes?: Recipe[] }) => {
  const [items, setItems] = useState<ShoppingItem[]>(INITIAL_ITEMS);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: 'other' as const });
  const [showCompleted, setShowCompleted] = useState(true);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (newItem.name.trim()) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        ...newItem,
        completed: false
      };
      setItems([...items, item]);
      setNewItem({ name: '', quantity: '', category: 'other' });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setItems(items.filter(item => !item.completed));
  };

  const completedItems = items.filter(item => item.completed);
  const pendingItems = items.filter(item => !item.completed);
  const completionRate = items.length > 0 ? Math.round((completedItems.length / items.length) * 100) : 0;

  const groupedItems = showCompleted ? items : pendingItems;
  const itemsByCategory = groupedItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <p className="text-xs text-muted-foreground">In your list</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Check className="h-4 w-4 text-recipe-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-recipe-success">{completedItems.length}</div>
            <p className="text-xs text-muted-foreground">{completionRate}% complete</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <X className="h-4 w-4 text-recipe-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-recipe-warning">{pendingItems.length}</div>
            <p className="text-xs text-muted-foreground">Items to buy</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Item */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="flex-1"
            />
            <Input
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="w-32"
            />
            <select 
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="pantry">Pantry</option>
              <option value="spices">Spices</option>
              <option value="other">Other</option>
            </select>
            <Button onClick={addItem}>Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={showCompleted}
              onCheckedChange={(checked) => setShowCompleted(checked === true)}
            />
            Show completed items
          </label>
        </div>
        <Button 
          variant="outline" 
          onClick={clearCompleted}
          disabled={completedItems.length === 0}
        >
          Clear Completed
        </Button>
      </div>

      {/* Shopping List by Category */}
      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
          <Card key={category} className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg">{CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}</span>
                <span className="capitalize">{category}</span>
                <Badge variant="secondary" className={CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]}>
                  {categoryItems.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 animate-slide-up ${
                      item.completed 
                        ? 'bg-muted/50 opacity-60' 
                        : 'bg-background/50 hover:bg-background/80'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.name}
                          </span>
                          {item.quantity && (
                            <Badge variant="outline" className="text-xs">
                              {item.quantity}
                            </Badge>
                          )}
                        </div>
                        {item.fromRecipe && (
                          <p className="text-xs text-muted-foreground">
                            From: {item.fromRecipe}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card className="bg-gradient-card border-0 shadow-soft text-center py-12">
          <CardContent>
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your shopping list is empty</h3>
            <p className="text-muted-foreground">Add items to start building your shopping list</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};