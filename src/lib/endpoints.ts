"use server";
import { fetcher } from "@/lib/fetcher";
import { redirect } from "@/i18n/routing";
import { shuffleArray } from "./utils";

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
        Authorization: `Bearer ${process.env.KURDSATNEWS_TOKEN}`,
        "Accept-Language": "ckb",
      },
      revalidate: params.revalidate || 3600,
      method: "GET",
    });

    return response;
  } catch (error: any) {
    if (error.statusCode === 404) {
      redirect("/404");
    } else {
      redirect("/500");
    }
  }
};

export const getCategoryQuestions = async ({
  params,
}: {
  params: { id: string; revalidate?: number; difficulty?: string };
}) => {
  try {
    const response = await fetcher({
      url: `https://opentdb.com/api.php?amount=1&category=${
        params.id
      }&page=1&difficulty=${params.difficulty || ""}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KURDSATNEWS_TOKEN}`,
        "Accept-Language": "ckb",
      },
      revalidate: params.revalidate || 3600,
      method: "GET",
      tags: ["questions"],
    });
    const data = response.results[0];
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
    if (error.statusCode === 404) {
      redirect("/404");
    } else {
      redirect("/500");
    }
  }
};
