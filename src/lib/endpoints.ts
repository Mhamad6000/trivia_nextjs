"use server";
import { fetcher } from "@/lib/fetcher";
import { redirect } from "next/navigation";
import { shuffleArray } from "./utils";
import { cookies } from "next/headers";
export const getCategories = async ({
  params,
}: {
  params: { revalidate?: number };
}) => {
  try {
    const response = await fetcher({
      url: `https://opentdb.com/api_category.php`,
      headers: {
        "Content-Type": "application/json",
      },
      revalidate: params.revalidate || 3600,
      method: "GET",
    });

    return response;
  } catch (error: any) {
    if (error.statusCode === 404) {
      redirect("/en/404");
    } else {
      redirect("/en/500");
    }
  }
};

export const getCategoryQuestions = async ({
  params,
}: {
  params: { id: string; revalidate?: number; difficulty?: string };
}) => {
  try {
    let token = cookies().get("trivia_token")?.value;

    // If no token is found, request a new one
    if (!token) {
      const tokenResponse = await fetcher({
        url: "https://opentdb.com/api_token.php?command=request",
        headers: {
          "Content-Type": "application/json",
        },
        revalidate: 5,
        method: "GET",
      });
      const tokenData = tokenResponse;
      token = tokenData.token;

      // Set the token in the cookies (e.g., for 24 hours)
      cookies().set("trivia_token", token as string, { maxAge: 18000 }); // 86400 seconds = 24 hours
    }

    const response = await fetcher({
      url: `https://opentdb.com/api.php?amount=1&category=${
        params.id
      }&difficulty=${params.difficulty || ""}&token=${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      // make it 5 seconds for testing purposes
      revalidate: 0,
      method: "GET",
      tags: ["questions"],
    });
    const data = response?.results[0];
    return {
      type: data.type,
      difficulty: data.difficulty,
      question: data.question,
      category: data.category,
      correctAnswer: data.correct_answer,
      allAnswers: shuffleArray([
        ...data.incorrect_answers,
        data.correct_answer,
      ]),
    };
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 404) {
      redirect("/en/404");
    } else {
      redirect("/en/500");
    }
  }
};
