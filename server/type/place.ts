export type Bar = {
  formattedAddress: string;
  name: string;
  placeId: string;
  url: string;
  website: string;
  wheelchairAccessibleEntrance: boolean;
  city: string;
  country: string;
};

export type BarResponseWithIndex = {
  bar: Bar;
  index: number;
};

export type Brewery = {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  website_url: string;
  address_1: string;

  // todo: associate brewery type and address_1, discriminated type
};
