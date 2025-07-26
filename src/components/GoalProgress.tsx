import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Calendar, Plus, TrendingUp } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  category: 'fitness' | 'career' | 'personal' | 'financial';
  deadline: string;
  unit: string;
}

const INITIAL_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Run a Half Marathon',
    description: 'Complete a 21km run by end of year',
    progress: 15,
    target: 21,
    category: 'fitness',
    deadline: '2024-12-31',
    unit: 'km'
  },
  {
    id: '2',
    title: 'Learn Spanish',
    description: 'Complete 100 lessons on language app',
    progress: 67,
    target: 100,
    category: 'personal',
    deadline: '2024-10-15',
    unit: 'lessons'
  },
  {
    id: '3',
    title: 'Save for Emergency Fund',
    description: 'Build emergency fund of $10,000',
    progress: 6500,
    target: 10000,
    category: 'financial',
    deadline: '2024-12-31',
    unit: '$'
  },
  {
    id: '4',
    title: 'Complete Certification',
    description: 'Finish professional development course',
    progress: 8,
    target: 12,
    category: 'career',
    deadline: '2024-11-01',
    unit: 'modules'
  },
  {
    id: '5',
    title: 'Read 24 Books',
    description: 'Read 2 books per month this year',
    progress: 18,
    target: 24,
    category: 'personal',
    deadline: '2024-12-31',
    unit: 'books'
  }
];

const CATEGORY_COLORS = {
  fitness: 'bg-wellness-energy text-wellness-growth',
  career: 'bg-wellness-focus text-wellness-growth',
  personal: 'bg-wellness-calm text-wellness-growth',
  financial: 'bg-primary/20 text-primary',
};

const CATEGORY_ICONS = {
  fitness: '🏃‍♂️',
  career: '💼',
  personal: '🌱',
  financial: '💰',
};

export const GoalProgress = () => {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  const completedGoals = goals.filter(g => g.progress >= g.target).length;
  const overallProgress = Math.round((completedGoals / goals.length) * 100);

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min(Math.round((progress / target) * 100), 100);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Trophy className="h-4 w-4 text-wellness-energy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">{completedGoals}/{goals.length}</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{overallProgress}% completion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-wellness-focus" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">{goals.length - completedGoals}</div>
            <p className="text-xs text-muted-foreground">in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-wellness-calm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">
              {Math.round(goals.reduce((acc, goal) => acc + getProgressPercentage(goal.progress, goal.target), 0) / goals.length)}%
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Plus className="h-3 w-3 mr-1" />
              Add Goal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal, index) => {
          const progressPercentage = getProgressPercentage(goal.progress, goal.target);
          const daysLeft = getDaysUntilDeadline(goal.deadline);
          const isCompleted = goal.progress >= goal.target;
          
          return (
            <Card 
              key={goal.id} 
              className={`bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 animate-slide-up ${
                isCompleted ? 'ring-2 ring-wellness-growth/50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{CATEGORY_ICONS[goal.category]}</span>
                      <CardTitle className={`text-lg ${isCompleted ? 'text-wellness-growth' : ''}`}>
                        {goal.title}
                      </CardTitle>
                      {isCompleted && <Trophy className="h-4 w-4 text-wellness-energy" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <Badge variant="secondary" className={CATEGORY_COLORS[goal.category]}>
                    {goal.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.progress}{goal.unit} / {goal.target}{goal.unit}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{progressPercentage}% complete</span>
                      {isCompleted ? (
                        <Badge variant="default" className="bg-wellness-growth">
                          ✅ Completed!
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {goal.target - goal.progress}{goal.unit} remaining
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      Update Progress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Monthly Goal Summary */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>This Month's Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Quick Wins</h4>
              <div className="space-y-2">
                {goals
                  .filter(g => getProgressPercentage(g.progress, g.target) > 70 && g.progress < g.target)
                  .map(goal => (
                    <div key={goal.id} className="flex items-center gap-2 p-2 rounded bg-wellness-calm/20">
                      <span>{CATEGORY_ICONS[goal.category]}</span>
                      <span className="text-sm">{goal.title}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {getProgressPercentage(goal.progress, goal.target)}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Needs Attention</h4>
              <div className="space-y-2">
                {goals
                  .filter(g => getProgressPercentage(g.progress, g.target) < 30)
                  .map(goal => (
                    <div key={goal.id} className="flex items-center gap-2 p-2 rounded bg-wellness-energy/20">
                      <span>{CATEGORY_ICONS[goal.category]}</span>
                      <span className="text-sm">{goal.title}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {getProgressPercentage(goal.progress, goal.target)}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};