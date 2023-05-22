import { BeverageList } from "@/components/organisms/beverage-list";
import FoodList from "@/components/organisms/food-list";
import { Beverage } from "@/interfaces/beverage";
import { Food } from "@/interfaces/food";

export default async function Home() {
  const beverages = await fetchBeverages();
  const foods = await fetchFoods();

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="bg-white">
        <BeverageList beverages={beverages} />
        <FoodList foods={foods} />
      </div>
    </main>
  );
}

export async function fetchBeverages(): Promise<Beverage[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AEM_HOST}/graphql/execute.json/${process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT}/beverages-all`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 24時間キャッシュする
      },
    }
  );

  if (!res.ok) throw new Error(res.statusText);

  const json = await res.json();
  const beverages = json.data.beverageList.items;

  return beverages;
}

export async function fetchFoods(): Promise<Food[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AEM_HOST}/graphql/execute.json/${process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT}/foods-all`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 24時間キャッシュする
      },
    }
  );

  if (!res.ok) throw new Error(res.statusText);

  const json = await res.json();
  const foods = json.data.foodList.items;

  return foods;
}
