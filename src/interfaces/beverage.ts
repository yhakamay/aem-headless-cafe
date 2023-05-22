import { Description } from "./description";
import { PrimaryImage } from "./primary-image";

export interface Beverage {
  slug: string;
  title: string;
  price: number;
  description: Description;
  primaryImage: PrimaryImage;
  _metadata: {
    calendarMetadata: {
      name: "jcr:created" | "cq:lastModified";
      value: string;
    }[];
  };
}
