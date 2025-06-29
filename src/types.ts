export interface MapSet {
  id: string;
  name: string;
  imageDirectory: string;
  deployments: Deployment[];
}

export interface Deployment {
  id: string;
  name: string;
  maps: Map[];
}

export interface Map {
  id: string;
  number: number | number[]
  name: string;
  image: string;
  type: "light" | "medium" | "heavy" | "?";
  features: string[];
}

export interface MapSetOption {
  id: string
  name: string
}
