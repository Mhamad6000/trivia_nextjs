"use client";

import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Feather, Zap, Target } from "lucide-react";

interface CategoryCardProps {
  id: number;
  name: string;
}

export function CategoryCard({ id, name }: CategoryCardProps) {
  const difficulties = [
    {
      name: "Easy",
      color: "text-primary hover:border-primary",
      icon: Feather,
    },
    {
      name: "Medium",
      color: "text-yellow-500 hover:border-yellow-500",
      icon: Zap,
    },
    { name: "Hard", color: "text-red-500 hover:border-red-500", icon: Target },
  ];

  return (
    <Card
      className={`transition-all duration-300 flex flex-col justify-between overflow-hidden bg-card`}
    >
      <CardHeader className={`transition-colors duration-300`}>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Choose difficulty:</p>
        <div className="flex flex-col space-y-2">
          {difficulties.map((difficulty) => (
            <Link
              key={difficulty.name}
              href={`/question?category=${id}&difficulty=${difficulty.name.toLowerCase()}`}
              className="w-full"
            >
              <Button
                variant="outline"
                className={`w-full ${difficulty.color} bg-background border border-muted text-white flex items-center justify-center`}
              >
                <difficulty.icon
                  className={`w-4 h-4 mr-2 ${difficulty.color}`}
                />
                {difficulty.name}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
