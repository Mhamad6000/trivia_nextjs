"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain } from "lucide-react";
import { Label } from "./ui/label";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryQuestions } from "@/lib/endpoints";
export default function QuestionAndAnswers({
  difficulty,
  categoryId,
}: {
  difficulty: string;
  categoryId: string;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const router = useRouter();
  const { data, refetch } = useQuery({
    queryKey: ["questions", categoryId, difficulty],
    queryFn: () => {
      return getCategoryQuestions({
        params: {
          id: categoryId,
          difficulty: difficulty,
        },
      });
    },
  });
  const handleDifficultyChange = (newDifficulty: string) => {
    router?.push(
      `/question?category=${categoryId}&difficulty=${newDifficulty}`
    );
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswered(false);
  };
  const handleSubmit = () => {
    setIsAnswered(true);
    setShowResult(true);
  };
  const handleNextQuestion = () => {
    refetch();
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswered(false);
  };
  return (
    <div className=" mx-auto px-4 py-8 max-w-7xl">
      <Card className="mb-8 ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            <span>{data?.category}</span>
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6" />
              <Select
                value={data?.difficulty}
                onValueChange={handleDifficultyChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Score: {score}/{questionsAnswered}
            </p>
          </div>
        </CardContent> */}
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle
            className="text-2xl font-semibold"
            dangerouslySetInnerHTML={{ __html: data?.question }}
          ></CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={setSelectedAnswer}
            className="space-y-4"
          >
            {data?.allAnswers?.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  disabled={isAnswered}
                  value={answer}
                  id={`answer-${index}`}
                />
                <Label
                  htmlFor={`answer-${index}`}
                  className="flex-grow p-4 bg-background/60 rounded-md hover:bg-background/80 transition-colors cursor-pointer"
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <>
              <div className="flex-1 text-center">
                {selectedAnswer === data?.correctAnswer ? (
                  <p className="text-green-500 font-semibold text-xl">
                    Correct!
                  </p>
                ) : (
                  <p className="text-red-500 font-semibold text-xl">
                    Incorrect. The correct answer is:{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.correctAnswer,
                      }}
                    ></span>
                  </p>
                )}
              </div>
            </>
          )}
        </CardFooter>
      </Card>

      {showResult && (
        <div className="text-center">
          <Button
            onClick={handleNextQuestion}
            size="lg"
            className="w-full max-w-md"
          >
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
}
