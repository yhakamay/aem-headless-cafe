import { BeverageDetails } from "@/interfaces/beverage-details";
import Image from "next/image";

export default async function BeverageDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const beverage = await fetchBeverageDetails(slug);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {beverage.title}
          </h2>
          <p className="mt-4 text-gray-500">{beverage.description.plaintext}</p>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_AEM_HOST}${beverage.primaryImage._path}`}
          alt={beverage.title}
          width={beverage.primaryImage.width}
          height={beverage.primaryImage.height}
          className="rounded-lg bg-gray-100"
        />
      </div>
    </div>
  );
}

async function fetchBeverageDetails(slug: string): Promise<BeverageDetails> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AEM_HOST}/graphql/execute.json/${process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT}/beverage-by-slug;slug=${slug}`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 24時間キャッシュする
      },
    }
  );

  if (!res.ok) throw new Error(res.statusText);

  const json = await res.json();
  const beverageDetails = json.data.beverageList.items[0];

  return beverageDetails;
}
