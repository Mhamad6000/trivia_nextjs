import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Target, Trophy, Clock, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Welcome to TriviaMaster
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Test your knowledge across various categories and challenge yourself
          with our exciting trivia game!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={Brain}
          title="Learn"
          description="Expand your knowledge with our diverse range of questions"
        />
        <FeatureCard
          icon={Zap}
          title="Challenge"
          description="Test your skills with varying difficulty levels"
        />
        <FeatureCard
          icon={Target}
          title="Improve"
          description="Track your progress and see your scores improve over time"
        />
        <FeatureCard
          icon={Trophy}
          title="Compete"
          description="Compare your scores with friends and aim for the top"
        />
        <FeatureCard
          icon={Clock}
          title="Time Attack"
          description="Race against the clock in our timed quiz mode"
        />
        <FeatureCard
          icon={Users}
          title="Multiplayer"
          description="Challenge friends in real-time multiplayer quizzes"
        />
      </div>

      <div className="text-center">
        <Link href="/categories">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300 transform hover:scale-105"
          >
            Start Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <Icon className="w-12 h-12 text-primary mb-4" />
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
