import Image from "next/image";
import Link from "next/link";

type Props = {
  imgPath: string;
  imgAlt?: string;
  imgSrcWidth: number;
  imgSrcHeight: number;
  slug: string;
  title: string;
  description: string;
  price?: string;
};

export default function Item(props: Props) {
  const {
    imgPath,
    imgAlt,
    imgSrcWidth,
    imgSrcHeight,
    slug,
    title,
    description,
    price,
  } = props;

  return (
    <div className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={`${process.env.NEXT_PUBLIC_AEM_HOST}${imgPath}`}
          alt={imgAlt ?? title}
          width={imgSrcWidth}
          height={imgSrcHeight}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/foods/${slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {description.slice(0, 50)}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
    </div>
  );
}
