import { Map, MapSet } from "@/types";
import { FullScreenViewer } from "react-iv-viewer";

export const MapViewer = ({ selectedMapSet, selectedMap }: { selectedMapSet: MapSet, selectedMap: Map }) => {
  return <FullScreenViewer
    img={`/${selectedMapSet.imageDirectory}/${selectedMap.image}`}
    hiResImg={`/${selectedMapSet.imageDirectory}/${selectedMap.image}`}
    height={"100%"}
    width={"100%"}
    defaultZoom={100} //default is 100
    maxZoom={500} //default is 500
    snapView={true} //default is true
    refreshOnResize={true} //default is true
    zoomOnMouseWheel={true} //default is true
    hasZoomButtons={true} //default is true
  />;
};