import QuestionAndAnswers from "@/components/QuestionAndAnswers";
import { getCategoryQuestions } from "@/lib/endpoints";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function SingleQuestionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["questions", searchParams?.category, searchParams?.difficulty],
    queryFn: () => {
      return getCategoryQuestions({
        params: {
          id: searchParams?.category as string,
          difficulty: searchParams?.difficulty as string,
        },
      });
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="">
      <HydrationBoundary state={dehydratedState}>
        <QuestionAndAnswers
          difficulty={searchParams?.difficulty as string}
          categoryId={searchParams?.category as string}
        />
      </HydrationBoundary>
    </div>
  );
}
