import { Description } from "./description";
import { PrimaryImage } from "./primary-image";

export interface Beverage {
  slug: string;
  title: string;
  price: number;
  description: Description;
  primaryImage: PrimaryImage;
}
