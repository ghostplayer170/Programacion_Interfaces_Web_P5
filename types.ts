export type film = {
  _id: string;
  brand: string;
  name: string;
  iso: number;
  formatThirtyFive: boolean;
  formatOneTwenty: boolean;
  color: boolean;
  process: string;
  staticImageUrl: string;
  description: string;
  customDescription: string[];
  keyFeatures: [
    {
      _id: string;
      feature: string;
    },
  ];
  dateAdded: string;
  __v: number;
};

export type project = {
  _id: string;
  name: string;
  description: string;
  films: filmItem[];
};

export type filmItem = {
  film: film;
  quantity: number;
};