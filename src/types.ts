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
}

export interface MapSetOption {
  id: string
  name: string
}

export interface OrientationProps {
  mapSets: MapSetOption[],
  setMapSet: (id: string) => void,
  setMapDeployment: (id: string) => void,
  selectedDeployment: MapSet['deployments'][number] | undefined,
  selectedMapIndex: number,
  selectionAction: (type: 'next' | 'prev' | 'random') => void,
  selectedMapSet: MapSet,
  selectedMap: Map | undefined,
};
