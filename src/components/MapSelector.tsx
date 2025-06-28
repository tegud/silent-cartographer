import { faChevronLeft, faChevronRight, faDice } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

export const MapSelector = ({
  mapName,
  totalMaps,
  currentIndex,
  action,
}: { mapName: string, totalMaps: number, currentIndex: number, action: (type: 'next' | 'prev' | 'random') => void }) => {
  const prevEnabled = currentIndex > 0;
  const nextEnabled = currentIndex < totalMaps - 1;

  return <div className="mb-3 flex gap-3 text-2xl items-center">
    <Button icon={faChevronLeft} onClick={() => action('prev')} disabled={!prevEnabled} />
    <div className="flex-1 text-center text-xl font-bold">
      {mapName}
    </div>
    <Button icon={faChevronRight} onClick={() => action('next')} disabled={!nextEnabled} />
    <Button icon={faDice} onClick={() => action('random')} />
  </div>;
};