import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Flame, CheckCircle2, Circle } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  category: 'health' | 'mindfulness' | 'productivity' | 'learning';
}

const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Morning meditation', completed: true, streak: 15, category: 'mindfulness' },
  { id: '2', name: '8 glasses of water', completed: true, streak: 12, category: 'health' },
  { id: '3', name: '30 min exercise', completed: true, streak: 8, category: 'health' },
  { id: '4', name: 'Read for 20 minutes', completed: false, streak: 5, category: 'learning' },
  { id: '5', name: 'Write in journal', completed: true, streak: 20, category: 'mindfulness' },
  { id: '6', name: 'No social media after 9pm', completed: false, streak: 3, category: 'productivity' },
  { id: '7', name: 'Gratitude practice', completed: true, streak: 18, category: 'mindfulness' },
  { id: '8', name: '10k steps', completed: true, streak: 7, category: 'health' },
];

const CATEGORY_COLORS = {
  health: 'bg-wellness-energy text-wellness-growth',
  mindfulness: 'bg-wellness-calm text-wellness-growth',
  productivity: 'bg-wellness-focus text-wellness-growth',
  learning: 'bg-primary/20 text-primary',
};

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
        : habit
    ));
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const completionRate = Math.round((completedHabits / habits.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-wellness-growth" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">{completedHabits}/{habits.length}</div>
            <Progress value={completionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{completionRate}% completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Flame className="h-4 w-4 text-wellness-energy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">
              {Math.max(...habits.map(h => h.streak))}
            </div>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            <Circle className="h-4 w-4 text-wellness-calm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">{habits.length}</div>
            <Button variant="outline" size="sm" className="mt-2">
              <Plus className="h-3 w-3 mr-1" />
              Add Habit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Habits List */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-wellness-growth" />
            Today's Habits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.map((habit, index) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => toggleHabit(habit.id)}
                    className="h-5 w-5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {habit.name}
                      </span>
                      <Badge variant="secondary" className={CATEGORY_COLORS[habit.category]}>
                        {habit.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-medium text-wellness-growth">
                      {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-muted-foreground">streak</div>
                  </div>
                  <Flame className={`h-4 w-4 ${habit.streak > 7 ? 'text-wellness-energy' : 'text-muted-foreground'}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day}</div>
                <div className={`h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index < 5 ? 'bg-wellness-growth text-white' : 'bg-muted'
                }`}>
                  {index < 5 ? `${Math.floor(Math.random() * 3) + 6}/8` : '-'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};