import { Beverage } from "@/interfaces/beverage";
import Link from "next/link";
import FadeIn from "../atoms/fade-in";
import Image from "next/image";

type Props = {
  beverages: Beverage[];
};

export function BeverageList(props: Props) {
  const { beverages } = props;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Beverages
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {beverages.map((beverage) => (
          <div key={beverage.slug}>
            <FadeIn>
              <div className="group relative">
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
                      <Link href={`/beverages/${beverage.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {beverage.title}
                      </Link>
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
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}
