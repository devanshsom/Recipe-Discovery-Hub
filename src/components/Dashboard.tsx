import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  Award,
  Calendar,
  Flame,
  Heart,
  Brain,
  Sparkles,
} from "lucide-react";
import { HabitTracker } from "./HabitTracker";
import { GoalProgress } from "./GoalProgress";
import { MoodCheck } from "./MoodCheck";
import { QuoteOfTheDay } from "./QuoteOfTheDay";

interface DashboardStats {
  completedHabits: number;
  totalHabits: number;
  currentStreak: number;
  weeklyProgress: number;
  goalsCompleted: number;
  totalGoals: number;
  wellnessScore: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    completedHabits: 6,
    totalHabits: 8,
    currentStreak: 15,
    weeklyProgress: 78,
    goalsCompleted: 3,
    totalGoals: 5,
    wellnessScore: 85,
  });

  const [activeView, setActiveView] = useState<'overview' | 'habits' | 'goals' | 'mood'>('overview');

  const habitCompletionRate = Math.round((stats.completedHabits / stats.totalHabits) * 100);
  const goalCompletionRate = Math.round((stats.goalsCompleted / stats.totalGoals) * 100);

  const renderActiveView = () => {
    switch (activeView) {
      case 'habits':
        return <HabitTracker />;
      case 'goals':
        return <GoalProgress />;
      case 'mood':
        return <MoodCheck />;
      default:
        return <OverviewContent stats={stats} habitCompletionRate={habitCompletionRate} goalCompletionRate={goalCompletionRate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wellness-calm/20 to-wellness-energy/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Personal Growth Hub
              </h1>
              <p className="text-muted-foreground">Track your journey to becoming your best self</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeView === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveView('overview')}
              className="transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeView === 'habits' ? 'default' : 'outline'}
              onClick={() => setActiveView('habits')}
              className="transition-all duration-300"
            >
              <Flame className="h-4 w-4 mr-2" />
              Habits
            </Button>
            <Button
              variant={activeView === 'goals' ? 'default' : 'outline'}
              onClick={() => setActiveView('goals')}
              className="transition-all duration-300"
            >
              <Target className="h-4 w-4 mr-2" />
              Goals
            </Button>
            <Button
              variant={activeView === 'mood' ? 'default' : 'outline'}
              onClick={() => setActiveView('mood')}
              className="transition-all duration-300"
            >
              <Heart className="h-4 w-4 mr-2" />
              Wellness
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-slide-up">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
};

const OverviewContent = ({ stats, habitCompletionRate, goalCompletionRate }: {
  stats: DashboardStats;
  habitCompletionRate: number;
  goalCompletionRate: number;
}) => (
  <div className="space-y-6">
    {/* Quote of the Day */}
    <QuoteOfTheDay />

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 animate-float">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Habits</CardTitle>
          <Flame className="h-4 w-4 text-wellness-energy" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wellness-growth">{stats.completedHabits}/{stats.totalHabits}</div>
          <Progress value={habitCompletionRate} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{habitCompletionRate}% completed today</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 animate-float" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Award className="h-4 w-4 text-wellness-focus" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wellness-growth">{stats.currentStreak}</div>
          <p className="text-xs text-muted-foreground">days in a row</p>
          <Badge variant="secondary" className="mt-2">
            🔥 On Fire!
          </Badge>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 animate-float" style={{ animationDelay: '0.2s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
          <Target className="h-4 w-4 text-wellness-calm" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wellness-growth">{stats.goalsCompleted}/{stats.totalGoals}</div>
          <Progress value={goalCompletionRate} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{goalCompletionRate}% completed</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 animate-float" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
          <Brain className="h-4 w-4 text-wellness-growth" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wellness-growth">{stats.wellnessScore}</div>
          <Progress value={stats.wellnessScore} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">Excellent mental state!</p>
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
    <Card className="bg-gradient-card border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-wellness-growth" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-wellness-calm/50 transition-all duration-300">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Plan Day</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-wellness-energy/50 transition-all duration-300">
            <Target className="h-5 w-5" />
            <span className="text-sm">Set Goal</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-wellness-focus/50 transition-all duration-300">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Mood Check</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-wellness-growth/50 transition-all duration-300">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">View Progress</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);