import { Food } from "@/interfaces/food";
import FadeIn from "../atoms/fade-in";
import Item from "../molecules/item";

type Props = {
  foods: Food[];
};

export default function FoodList(props: Props) {
  const { foods } = props;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Foods</h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {foods.map((food) => (
          <div key={food.slug}>
            <FadeIn>
              <Item
                imgPath={food.primaryImage._path}
                imgSrcWidth={food.primaryImage.width}
                imgSrcHeight={food.primaryImage.height}
                slug={food.slug}
                title={food.title}
                description={food.description.plaintext}
              />
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  );
}
