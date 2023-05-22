import { Description } from "./description";
import { PrimaryImage } from "./primary-image";

export interface FoodDetails {
  title: string;
  description: Description;
  price: number;
  primaryImage: PrimaryImage;
  type: string;
}
