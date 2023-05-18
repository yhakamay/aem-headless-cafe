export interface Beverage {
  slug: string;
  title: string;
  price: number;
  description: Description;
  primaryImage: PrimaryImage;
}

interface Description {
  plaintext: string;
}

interface PrimaryImage {
  _path: string;
  mimeType: string;
  width: number;
  height: number;
}
