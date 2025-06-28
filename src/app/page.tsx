"use client";

import { loadMapSet } from "@/map-sets";
import { MapSet } from "@/types";
import React, { useEffect, useState } from "react";
import { Portrait } from "@/components/Portrait";

interface MapSetOption {
  id: string
  name: string
}

const MAP_SETS: MapSetOption[] = [
  { id: "wtc-2025-v2", name: "WTC (2025 v2.0)" },
];

export default function Home() {
  const [mapSet, setMapSet] = useState<string>(MAP_SETS[0].id);
  const [selectedMapSet, setSelectedMapSet] = useState<MapSet | undefined>();
  const [mapDeployment, setMapDeployment] = useState<string | undefined>();
  const [map, setMap] = useState<string | undefined>();
  const [typeFilter, setTypeFilter] = useState<string | undefined>();

  const selectedDeployment = selectedMapSet
    ? selectedMapSet.deployments.find(({ id }) => id === mapDeployment)
    : undefined;
  
  const filteredMaps = selectedDeployment && selectedDeployment.maps.filter((map) => {
    if (!typeFilter) return true;
    return map.type.toLowerCase() === typeFilter.toLowerCase();
  });
  
  const selectedMap = filteredMaps && map
    ? filteredMaps.find(({ id }) => id === map)
    : filteredMaps
      ? filteredMaps[0]
      : undefined;
  
  const selectedMapIndex = filteredMaps && selectedMap
    ? filteredMaps.findIndex(({ id }) => id === selectedMap.id) : 0;
    
  const getMapSetInfo = async (mapSetId: string) => {
    const mapSet = await loadMapSet(mapSetId);
    setSelectedMapSet(mapSet);
    setMapDeployment(mapSet.deployments[0].id);
  }

  useEffect(() => {
    setMap(undefined)
  }, [mapDeployment]);

  useEffect(() => {
    getMapSetInfo(mapSet)
  }, [mapSet]);

  const selectionAction = (type: 'next' | 'prev' | 'random') => {
    if (!selectedMapSet || !selectedDeployment) return;

    const currentIndex = selectedMapIndex;

    switch (type) {
      case 'next':
        if (currentIndex < selectedDeployment.maps.length - 1) {
          setMap(selectedDeployment.maps[currentIndex + 1].id);
        }
        break;
      case 'prev':
        if (currentIndex > 0) {
          setMap(selectedDeployment.maps[currentIndex - 1].id);
        }
        break;
      case 'random':
        const randomIndex = Math.floor(Math.random() * selectedDeployment.maps.length);
        setMap(selectedDeployment.maps[randomIndex].id);
        break;
    }
  };

  if (!selectedMapSet) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-lg">Loading map set...</div>
      </div>
    );
  }

  const state = {
    mapSets: MAP_SETS,
    setMapSet,
    setMapDeployment,
    selectedMapSet,
    selectedMap,
    selectedDeployment,
    selectedMapIndex,
    selectionAction,
  };

  return <Portrait {...state} />;
}
