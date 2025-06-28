"use client";

import { Button } from "@/components/Button";
import { MapKey } from "@/components/MapKey";
import { MapViewer } from "@/components/MapViewer";
import { loadMapSet } from "@/map-sets";
import { MapSet } from "@/map-sets/types";
import { faChevronLeft, faChevronRight, faCircleInfo, faDice } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

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
  const [map] = useState<string | undefined>();

  const selectedDeployment = selectedMapSet
    ? selectedMapSet.deployments.find(({ id }) => id === mapDeployment)
    : undefined;
  
  const selectedMap = selectedDeployment && map
    ? selectedDeployment.maps.find(({ id }) => id === map)
    : selectedDeployment
      ? selectedDeployment.maps[0]
      : undefined;
    
  const getMapSetInfo = async (mapSetId: string) => {
    const mapSet = await loadMapSet(mapSetId);
    setSelectedMapSet(mapSet);
    setMapDeployment(mapSet.deployments[0].id);
  }

  useEffect(() => {
    getMapSetInfo(mapSet)
  }, [mapSet]);

  if (!selectedMapSet) {
    return (
      <div className="max-w-2xl mx-auto border-x-2 p-6 border-white">
        <div className="text-center text-lg">Loading map set...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto border-x-2 p-6 border-white">
      <div className="flex gap-6">
        <label className="flex-1 flex flex-col gap-3">
          <div className="font-bold">Map Set</div>
          <select className="bg-white text-lg p-2 text-black w-full" onChange={(e) => setMapSet(e.target.value)}>
            {MAP_SETS.map((mapSet) => {
              return <option key={`mapset-option__${mapSet.id}`} value={mapSet.id}>{mapSet.name}</option>
            })}
          </select>
        </label>
        <label className="flex-1 flex flex-col gap-3">
          <div className="font-bold">Deployment</div>
          <select className="bg-white text-lg p-2 text-black w-full" onChange={(e) => setMapDeployment(e.target.value)}>
            {selectedMapSet.deployments.map((deployment) => {
              return <option key={`deployment-option__${deployment.id}`} value={deployment.id}>{deployment.name}</option>
            })}
          </select>
        </label>
      </div>
      <div>
        <div className="font-bold pt-6 pb-3">Filter by:</div>
        <div className="flex gap-3">
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" />
            <span>None</span>
          </label>
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" />
            <span>Light</span>
          </label>
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" />
            <span>Medium</span>
          </label>
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" />
            <span>Heavy</span>
          </label>
        </div>
      </div>
      {selectedMap && selectedDeployment && <div className="py-6">
        <div className="mb-3 flex gap-3 text-2xl items-center">
          <Button icon={faChevronLeft} />
          <div className="flex-1 text-center text-xl font-bold">
            {selectedMap.name}
          </div>
          <Button icon={faChevronRight} />
          <Button icon={faDice} />
        </div>
        <div className="mb-3">
          <MapViewer selectedMapSet={selectedMapSet} selectedMap={selectedMap} />
        </div>
        <div className="my-3 flex gap-3 items-stretch">
          <Button icon={faCircleInfo} label="Key" />
        </div>
        <MapKey />
      </div>}
    </div>
  );
}
