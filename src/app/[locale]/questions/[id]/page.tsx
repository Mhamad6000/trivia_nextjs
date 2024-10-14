import { getCategoryQuestions } from "@/lib/endpoints";

export default async function SingleQuestionPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const questions = await getCategoryQuestions({ params: { id } });
  console.log(questions);
  return <div>Single Question Page {id}</div>;
}
