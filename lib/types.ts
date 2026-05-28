export type Property = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
};

export type PropertiesResponse = {
  properties: Property[];
  favorites: string[];
};
