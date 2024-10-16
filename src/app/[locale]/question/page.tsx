import QuestionAndAnswers from "@/components/QuestionAndAnswers";

export default async function SingleQuestionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="">
      <QuestionAndAnswers
        difficulty={searchParams?.difficulty as string}
        categoryId={searchParams?.category as string}
      />
    </div>
  );
}
