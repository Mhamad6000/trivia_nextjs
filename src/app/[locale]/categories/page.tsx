import { getCategories } from "@/lib/endpoints";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryCard } from "@/components/CategoryCard";

export default async function CategoriesPage() {
  const categories = await getCategories({ params: { revalidate: 3600 } });
  return (
    <div className="">
      <Card className="mb-8 bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Trivia Categories
          </CardTitle>
          <CardDescription>
            Choose a category and difficulty to start your trivia challenge!
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories?.trivia_categories?.map((category: any) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}
