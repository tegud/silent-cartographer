import { faCircleInfo, faFistRaised, faGun, faQuestionCircle, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { MapKey } from "./MapKey";
import { MapSelector } from "./MapSelector";
import { MapViewer } from "./MapViewer";
import { Map, MapSet, MapSetOption } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrientationProps {
  mapSets: MapSetOption[],
  setMapSet: (id: string) => void,
  setTypeFilter: (type: string) => void,
  setMapDeployment: (id: string) => void,
  filteredMaps: Map[] | undefined,
  typeFilter: string,
  selectedDeployment: MapSet['deployments'][number] | undefined,
  selectedMapIndex: number,
  selectionAction: (type: 'next' | 'prev' | 'random') => void,
  selectedMapSet: MapSet,
  selectedMap: Map | undefined,
};

export const Portrait = ({
  mapSets,
  setMapSet,
  setMapDeployment,
  setTypeFilter,
  typeFilter,
  filteredMaps,
  selectedMapSet,
  selectedMap,
  selectedDeployment,
  selectedMapIndex,
  selectionAction,
}: OrientationProps) => {
  function getIconFromType(type: string): import("@fortawesome/fontawesome-svg-core").IconProp {
    switch (type.toLowerCase()) {
      case "light":
        return faGun;
      case "medium":
        return faScaleBalanced;
      case "heavy":
        return faFistRaised;
      default:
        return faQuestionCircle;
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-3">
      <div className="flex gap-6">
        <label className="flex-1 flex flex-col gap-3">
          <div className="font-bold">Map Set</div>
          <select className="bg-white text-lg p-2 text-black w-full" onChange={(e) => setMapSet(e.target.value)}>
            {mapSets.map((mapSet) => {
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
            <input type="radio" name="filter" className="scale-150" value="all" checked={typeFilter === "all"} onChange={((e) => setTypeFilter(e.target.value))} />
            <span>All</span>
          </label>
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" value="light" checked={typeFilter === "light"} onChange={((e) => setTypeFilter(e.target.value))} />
            <span>Light</span>
          </label>
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" value="medium" checked={typeFilter === "medium"} onChange={((e) => setTypeFilter(e.target.value))} />
            <span>Medium</span>
          </label>
          <label className="flex-1 flex text-lg gap-3">
            <input type="radio" name="filter" className="scale-150" value="heavy" checked={typeFilter === "heavy"} onChange={((e) => setTypeFilter(e.target.value))} />
            <span>Heavy</span>
          </label>
        </div>
      </div>
      {selectedMap && selectedDeployment && <div className="py-6">
        <MapSelector
          mapName={selectedMap.name}
          totalMaps={filteredMaps ? filteredMaps.length : 0}
          currentIndex={selectedMapIndex}
          action={selectionAction} />
        <div className="mb-3">
          <MapViewer selectedMapSet={selectedMapSet} selectedMap={selectedMap} />
        </div>
        <div className="my-3 flex gap-3 items-center">
          <div
            className={`flex gap-2 items-center`}>
            <div className="text-xl">
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
            <div className="text-lg">
              Key
            </div>
          </div>
          <div className="font-bold text-xl ml-auto flex gap-2">
            <div><FontAwesomeIcon icon={getIconFromType(selectedMap.type)} /></div>
            <div>{`${selectedMap.type[0].toUpperCase()}${selectedMap.type.slice(1)}`}</div>
          </div>
        </div>
        <MapKey map={selectedMap} />
      </div>}
    </div>
  );
};
