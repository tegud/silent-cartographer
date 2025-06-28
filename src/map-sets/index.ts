import { MapSet } from "../types";

export const loadMapSet = async (mapSetId: string): Promise<MapSet> => {
  const res = await fetch(`/data/${mapSetId}.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch map set");
  }

  return res.json();
};