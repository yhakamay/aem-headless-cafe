import Badge from "@/components/atoms/badge";
import { Food } from "@/interfaces/food";
import Image from "next/image";
import { fetchFoods } from "../../page";
import { FoodDetails } from "@/interfaces/food-details";

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
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {food.title}
          </h2>
          {food.type && (
            <div className="pt-3">
              <Badge>{food.type.toUpperCase()}</Badge>
            </div>
          )}
          <p className="mt-4 text-gray-500">{food.description.plaintext}</p>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_AEM_HOST}${food.primaryImage._path}`}
          alt={food.title}
          width={food.primaryImage.width}
          height={food.primaryImage.height}
          className="rounded-lg bg-gray-100"
        />
      </div>
    </div>
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
