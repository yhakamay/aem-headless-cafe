import { fetchBeverages } from "@/app/page";
import ItemDetails from "@/components/molecules/item-details";
import { Beverage } from "@/interfaces/beverage";
import { BeverageDetails } from "@/interfaces/beverage-details";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const beverage = await fetchBeverageDetails(slug);

  return {
    title: beverage.title,
    description: beverage.description.plaintext,
  };
}

export default async function BeverageDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const beverage = await fetchBeverageDetails(slug);

  return (
    <ItemDetails
      title={beverage.title}
      description={beverage.description.plaintext}
      label={beverage.flavor}
      primaryImage={beverage.primaryImage}
    />
  );
}

export async function generateStaticParams() {
  const beverages: Beverage[] = await fetchBeverages();

  return beverages.map((beverage) => ({
    slug: beverage.slug,
  }));
}

async function fetchBeverageDetails(slug: string): Promise<BeverageDetails> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AEM_HOST}/graphql/execute.json/${process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT}/beverage-by-slug;slug=${slug}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  if (!res.ok) throw new Error(res.statusText);

  const json = await res.json();
  const beverageDetails = json.data.beverageList.items[0];

  return beverageDetails;
}
