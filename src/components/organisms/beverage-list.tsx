import { Beverage } from "@/interfaces/beverage";
import FadeIn from "../atoms/fade-in";
import Item from "../molecules/item";

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
              <Item
                imgPath={beverage.primaryImage._path}
                imgSrcWidth={beverage.primaryImage.width}
                imgSrcHeight={beverage.primaryImage.height}
                slug={beverage.slug}
                title={beverage.title}
                description={beverage.description.plaintext}
              />
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}
