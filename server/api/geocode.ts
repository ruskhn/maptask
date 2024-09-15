type GeocoderResponseMetaData = {
  Point: {
    pos: string;
  };
  request: string;
  results: string;
  found: string;
};

type AddressComponent = {
  kind: string;
  name: string;
};

type Address = {
  country_code: string;
  formatted: string;
  postal_code?: string;
  Components: AddressComponent[];
};

type PostalCode = {
  PostalCodeNumber: string;
};

type Premise = {
  PremiseNumber: string;
  PostalCode?: PostalCode;
};

type Thoroughfare = {
  ThoroughfareName: string;
  Premise?: Premise;
};

type Locality = {
  LocalityName: string;
  Thoroughfare?: Thoroughfare;
  DependentLocality?: {
    DependentLocalityName: string;
  };
};

type SubAdministrativeArea = {
  SubAdministrativeAreaName: string;
  Locality?: Locality;
};

type AdministrativeArea = {
  AdministrativeAreaName: string;
  SubAdministrativeArea?: SubAdministrativeArea;
};

type Country = {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea?: AdministrativeArea;
};

type AddressDetails = {
  Country: Country;
};

type GeocoderMetaData = {
  precision: string;
  text: string;
  kind: string;
  Address: Address;
  AddressDetails: AddressDetails;
};

type GeoObjectMetaDataProperty = {
  GeocoderMetaData: GeocoderMetaData;
};

type Envelope = {
  lowerCorner: string;
  upperCorner: string;
};

type Point = {
  pos: string;
};

type GeoObject = {
  metaDataProperty: GeoObjectMetaDataProperty;
  name: string;
  description: string;
  boundedBy: {
    Envelope: Envelope;
  };
  uri: string;
  Point: Point;
};

type FeatureMember = {
  GeoObject: GeoObject;
};

type GeoObjectCollection = {
  metaDataProperty: {
    GeocoderResponseMetaData: GeocoderResponseMetaData;
  };
  featureMember: FeatureMember[];
};

type GeoCoderResponse = {
  response: {
    GeoObjectCollection: GeoObjectCollection;
  };
};

export default defineEventHandler(async (event) => {
  const { yandexMapsApiKey } = useRuntimeConfig();
  const { geocode } = getQuery(event);

  console.log("geo", geocode);

  const { response } = await $fetch<GeoCoderResponse>(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${yandexMapsApiKey}&geocode=${geocode}&lang=en_US&format=json`,
    { method: "GET" }
  );

  return response.GeoObjectCollection.featureMember[0];
});
