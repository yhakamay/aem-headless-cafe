import { Description } from "./description";
import { PrimaryImage } from "./primary-image";

export interface BeverageDetails {
  title: string;
  description: Description;
  price: number;
  primaryImage: PrimaryImage;
  flavor: string;
}
