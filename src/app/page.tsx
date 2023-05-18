import { Beverage } from "@/interfaces/beverage";
import Image from "next/image";

export default async function Home() {
  const beverages = await fetchBeverages();

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            ドリンク
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {beverages.map((beverage) => (
              <div key={beverage.slug} className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_AEM_HOST}${beverage.primaryImage._path}`}
                    alt={beverage.title}
                    width={beverage.primaryImage.width}
                    height={beverage.primaryImage.height}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/beverages/${beverage.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {beverage.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {beverage.description.plaintext.slice(0, 50)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {beverage.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

async function fetchBeverages(): Promise<Beverage[]> {
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
