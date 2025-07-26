import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Brain, Zap, Moon, Sun, Cloud, CloudRain } from "lucide-react";

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  emotions: string[];
  note: string;
  energy: number;
  stress: number;
}

const MOOD_EMOJIS = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤩'];
const MOOD_LABELS = ['Very Low', 'Low', 'Okay', 'Good', 'Great', 'Excellent', 'Amazing'];

const EMOTION_OPTIONS = [
  { name: 'Happy', color: 'bg-wellness-energy', emoji: '😊' },
  { name: 'Calm', color: 'bg-wellness-calm', emoji: '😌' },
  { name: 'Excited', color: 'bg-wellness-focus', emoji: '🤩' },
  { name: 'Grateful', color: 'bg-wellness-growth', emoji: '🙏' },
  { name: 'Anxious', color: 'bg-destructive/20', emoji: '😰' },
  { name: 'Tired', color: 'bg-muted', emoji: '😴' },
  { name: 'Motivated', color: 'bg-primary/20', emoji: '💪' },
  { name: 'Peaceful', color: 'bg-wellness-calm', emoji: '🕊️' },
];

const RECENT_ENTRIES: MoodEntry[] = [
  {
    id: '1',
    date: '2024-01-24',
    mood: 5,
    emotions: ['Happy', 'Motivated'],
    note: 'Great workout this morning, feeling energized!',
    energy: 8,
    stress: 2
  },
  {
    id: '2',
    date: '2024-01-23',
    mood: 4,
    emotions: ['Calm', 'Grateful'],
    note: 'Peaceful evening with family',
    energy: 6,
    stress: 3
  },
  {
    id: '3',
    date: '2024-01-22',
    mood: 6,
    emotions: ['Excited', 'Happy'],
    note: 'Got promoted at work! Celebrating tonight.',
    energy: 9,
    stress: 1
  }
];

export const MoodCheck = () => {
  const [currentMood, setCurrentMood] = useState<number>(5);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentEnergy, setCurrentEnergy] = useState<number>(7);
  const [currentStress, setCurrentStress] = useState<number>(3);
  const [entries] = useState<MoodEntry[]>(RECENT_ENTRIES);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const saveMoodEntry = () => {
    // In a real app, this would save to a database
    console.log('Saving mood entry:', {
      mood: currentMood,
      emotions: selectedEmotions,
      note: currentNote,
      energy: currentEnergy,
      stress: currentStress
    });
    
    // Reset form
    setCurrentNote('');
    setSelectedEmotions([]);
  };

  const getWeeklyAverage = () => {
    return Math.round(entries.reduce((acc, entry) => acc + entry.mood, 0) / entries.length);
  };

  const getEnergyIcon = (level: number) => {
    if (level <= 3) return <Moon className="h-4 w-4" />;
    if (level <= 6) return <Cloud className="h-4 w-4" />;
    if (level <= 8) return <Sun className="h-4 w-4" />;
    return <Zap className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
            <Heart className="h-4 w-4 text-wellness-growth" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">
              {MOOD_EMOJIS[getWeeklyAverage()]} {MOOD_LABELS[getWeeklyAverage()]}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on {entries.length} entries</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
            {getEnergyIcon(currentEnergy)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">{currentEnergy}/10</div>
            <p className="text-xs text-muted-foreground mt-1">Current energy</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <Brain className="h-4 w-4 text-wellness-calm" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness-growth">{currentStress}/10</div>
            <p className="text-xs text-muted-foreground mt-1">
              {currentStress <= 3 ? 'Low stress' : currentStress <= 6 ? 'Moderate' : 'High stress'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Check-in */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-wellness-growth" />
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Scale */}
          <div>
            <label className="text-sm font-medium mb-3 block">Overall Mood</label>
            <div className="grid grid-cols-7 gap-2">
              {MOOD_EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMood(index)}
                  className={`p-3 rounded-lg text-2xl transition-all duration-300 hover:scale-110 ${
                    currentMood === index 
                      ? 'bg-wellness-growth text-white shadow-glow' 
                      : 'bg-background hover:bg-wellness-calm/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-wellness-growth">
                {MOOD_LABELS[currentMood]}
              </span>
            </div>
          </div>

          {/* Emotions */}
          <div>
            <label className="text-sm font-medium mb-3 block">What emotions are you experiencing?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {EMOTION_OPTIONS.map((emotion) => (
                <Button
                  key={emotion.name}
                  variant="outline"
                  onClick={() => toggleEmotion(emotion.name)}
                  className={`h-auto p-3 justify-start transition-all duration-300 ${
                    selectedEmotions.includes(emotion.name)
                      ? 'bg-wellness-growth text-white border-wellness-growth shadow-soft'
                      : 'hover:bg-wellness-calm/20'
                  }`}
                >
                  <span className="mr-2">{emotion.emoji}</span>
                  {emotion.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Energy and Stress Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Energy Level: {currentEnergy}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentEnergy}
                onChange={(e) => setCurrentEnergy(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Stress Level: {currentStress}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentStress}
                onChange={(e) => setCurrentStress(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-medium mb-3 block">Optional Note</label>
            <Textarea
              placeholder="What's on your mind? Any thoughts about your day..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={saveMoodEntry} className="w-full">
            Save Mood Check-in
          </Button>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Recent Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg bg-background/50 border transition-all duration-300 hover:shadow-soft animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{MOOD_EMOJIS[entry.mood]}</span>
                    <div>
                      <div className="font-medium">{MOOD_LABELS[entry.mood]}</div>
                      <div className="text-sm text-muted-foreground">{entry.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ⚡ {entry.energy}/10
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      🧠 {entry.stress}/10
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-2">
                  {entry.emotions.map((emotion) => (
                    <Badge key={emotion} variant="outline" className="text-xs">
                      {EMOTION_OPTIONS.find(e => e.name === emotion)?.emoji} {emotion}
                    </Badge>
                  ))}
                </div>
                
                {entry.note && (
                  <p className="text-sm text-muted-foreground italic">"{entry.note}"</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};