import { fetcher } from "@/lib/fetcher";
import { redirect } from "@/i18n/routing";

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
  params: { id: string; revalidate?: number };
}) => {
  try {
    const response = await fetcher({
      url: `https://opentdb.com/api.php?amount=1&category=${params.id}&page=1`,
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
