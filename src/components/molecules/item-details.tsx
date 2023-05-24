import Image from "next/image";
import FadeIn from "../atoms/fade-in";
import Badge from "../atoms/badge";
import { PrimaryImage } from "@/interfaces/primary-image";

type Props = {
  title: string;
  description: string;
  label: string;
  primaryImage: PrimaryImage;
};

export default function ItemDetails(props: Props) {
  const { title, description, label, primaryImage } = props;

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>
        {label && (
          <div className="pt-3">
            <Badge>{label.toUpperCase()}</Badge>
          </div>
        )}
        <p className="mt-4 text-gray-500">{description}</p>
      </div>
      <FadeIn>
        <Image
          src={`${process.env.NEXT_PUBLIC_AEM_HOST}${primaryImage._path}`}
          alt={title}
          width={primaryImage.width}
          height={primaryImage.height}
          className="rounded-lg bg-gray-100"
        />
      </FadeIn>
    </div>
  );
}
