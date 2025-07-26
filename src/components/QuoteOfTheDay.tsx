import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Share, Sparkles } from "lucide-react";

interface Quote {
  text: string;
  author: string;
  category: 'motivation' | 'wisdom' | 'success' | 'mindfulness';
}

const INSPIRATIONAL_QUOTES: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    category: "mindfulness"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "success"
  },
  {
    text: "Don't be afraid to give yourself everything you've ever wanted in life.",
    author: "Unknown",
    category: "motivation"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "wisdom"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "mindfulness"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "wisdom"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "mindfulness"
  }
];

const CATEGORY_COLORS = {
  motivation: 'from-wellness-energy to-wellness-growth',
  wisdom: 'from-wellness-calm to-wellness-focus',
  success: 'from-primary to-primary-glow',
  mindfulness: 'from-wellness-calm to-wellness-energy'
};

const CATEGORY_EMOJIS = {
  motivation: '🚀',
  wisdom: '🦉',
  success: '🎯',
  mindfulness: '🧘‍♀️'
};

export const QuoteOfTheDay = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(INSPIRATIONAL_QUOTES[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get a quote based on the current date to ensure consistency
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % INSPIRATIONAL_QUOTES.length;
    setCurrentQuote(INSPIRATIONAL_QUOTES[quoteIndex]);
  }, []);

  const getNewQuote = () => {
    setIsAnimating(true);
    const currentIndex = INSPIRATIONAL_QUOTES.findIndex(q => q.text === currentQuote.text);
    const newIndex = (currentIndex + 1) % INSPIRATIONAL_QUOTES.length;
    
    setTimeout(() => {
      setCurrentQuote(INSPIRATIONAL_QUOTES[newIndex]);
      setIsAnimating(false);
    }, 300);
  };

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Inspiration',
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${CATEGORY_COLORS[currentQuote.category]} border-0 shadow-glow animate-slide-up relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Sparkles className="w-full h-full" />
      </div>
      
      <CardContent className="p-6 relative">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <div className="flex items-start gap-4">
            <div className="text-3xl">{CATEGORY_EMOJIS[currentQuote.category]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium text-white/90">Quote of the Day</h3>
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full capitalize">
                  {currentQuote.category}
                </span>
              </div>
              
              <blockquote className="text-lg md:text-xl font-medium text-white mb-3 leading-relaxed">
                "{currentQuote.text}"
              </blockquote>
              
              <cite className="text-sm text-white/80 not-italic">
                — {currentQuote.author}
              </cite>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={shareQuote}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={getNewQuote}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isAnimating ? 'animate-spin' : ''}`} />
              New Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};