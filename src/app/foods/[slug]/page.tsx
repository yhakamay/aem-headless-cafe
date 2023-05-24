import { Food } from "@/interfaces/food";
import { fetchFoods } from "../../page";
import { FoodDetails } from "@/interfaces/food-details";
import ItemDetails from "@/components/molecules/item-details";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const food = await fetchFoodDetails(slug);

  return {
    title: food.title,
    description: food.description.plaintext,
  };
}

export default async function FoodDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const food = await fetchFoodDetails(slug);

  return (
    <ItemDetails
      title={food.title}
      description={food.description.plaintext}
      label={food.type}
      primaryImage={food.primaryImage}
    />
  );
}

export async function generateStaticParams() {
  const foods: Food[] = await fetchFoods();

  return foods.map((food) => ({
    slug: food.slug,
  }));
}

async function fetchFoodDetails(slug: string): Promise<FoodDetails> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AEM_HOST}/graphql/execute.json/${process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT}/food-by-slug;slug=${slug}`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 24時間キャッシュする
      },
    }
  );

  if (!res.ok) throw new Error(res.statusText);

  const json = await res.json();
  const foodDetails = json.data.foodList.items[0];

  return foodDetails;
}
