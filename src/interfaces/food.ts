import { Description } from "./description";
import { PrimaryImage } from "./primary-image";

export interface Food {
  slug: string;
  title: string;
  price: number;
  description: Description;
  primaryImage: PrimaryImage;
  type: string;
  _metadata: {
    calendarMetadata: {
      name: "jcr:created" | "cq:lastModified";
      value: string;
    }[];
  };
}
