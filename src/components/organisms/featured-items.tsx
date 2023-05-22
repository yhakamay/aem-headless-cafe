import { Beverage } from "@/interfaces/beverage";
import { Food } from "@/interfaces/food";
import Image from "next/image";
import Link from "next/link";

type Props = {
  featuredBeverage: Beverage;
  featuredFood: Food;
};

export default function FeaturedItems(props: Props) {
  const { featuredBeverage, featuredFood } = props;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-2xl font-bold text-gray-900">Featured</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <Image
                src={`${process.env.NEXT_PUBLIC_AEM_HOST}${featuredBeverage.primaryImage._path}`}
                width={featuredBeverage.primaryImage.width}
                height={featuredBeverage.primaryImage.height}
                alt={featuredBeverage.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
              <Link href={`/beverages/${featuredBeverage.slug}`}>
                <span className="absolute inset-0" />
                {featuredBeverage.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {featuredBeverage.description.plaintext}
            </p>
          </div>

          <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <Image
                src={`${process.env.NEXT_PUBLIC_AEM_HOST}${featuredFood.primaryImage._path}`}
                width={featuredFood.primaryImage.width}
                height={featuredFood.primaryImage.height}
                alt={featuredFood.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
              <Link href={`/foods/${featuredFood.slug}`}>
                <span className="absolute inset-0" />
                {featuredFood.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {featuredFood.description.plaintext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
