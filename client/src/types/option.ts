export type Option = 'bar' | 'brewery';

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

//? 怎样灵活使用这两个 type
export type Place = Bar & Brewery;

type OptionBar = {
  type: 'bar';
  info: Bar;
};

type OptionBrewery = {
  type: 'brewery';
  info: Brewery;
};

export type OptionResponse = OptionBar | OptionBrewery;

export type OptionRequestArg = {
  type: Option;
  userId: string;
};
