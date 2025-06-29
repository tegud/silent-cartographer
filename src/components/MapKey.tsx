import { Map } from "@/types";

interface KeyItem {
  image: string;
  label: string;
  id: string;
  width: string;
  height: string;
  imageHeight: string;
}

export const MapKey = ({ map }: { map: Map }) => {
  const images: KeyItem[] = [
    { image: "/large-ruin.png", label: "Large Ruin", id: "large ruin", width: "w-1/4", height: "h-20", imageHeight: "h-20" },
    { image: "/medium-ruin.png", label: "Small Ruin", id: "small ruin", width: "w-1/4", height: "h-20", imageHeight: "h-20" },
    { image: "/cargo-container.png", label: "Cargo Container", id: "cargo container", width: "w-1/4", height: "h-20", imageHeight: "h-12" },
    { image: "/prototype-ruin.png", label: "Prototype Ruin", id: "prototype ruin", width: "w-1/4", height: "h-20", imageHeight: "h-20" },
    { image: "/no-los.png", label: "No Line of Sight through gap", id: "no los", width: "w-1/4", height: "h-23", imageHeight: "h-15" },
    { image: "/knight-gap.png", label: "Indicates if a knight sized base (110mm oval base) can or can not pass through gap", id: "knight gap", width: "w-1/4", height: "h-40", imageHeight: "h-10" },
    { image: "/cargo-knight.png", label: "Indicates if a Knight sized base (oval 110mm) can fit around cargo container", id: "knight cargo", width: "w-1/4", height: "h-40", imageHeight: "h-10" },
  ].filter(item => {
    return !map?.features || map.features.includes(item.id.toLowerCase());
  });


  return <div className={`h-32 flex items-stretch gap-3 w-full flex-wrap`}>
    {images.map((item, index) => (
      <div key={index} className={`flex flex-col justify-end mb-8 items-center ${item.width} ${item.height}`}>
        <div style={{ backgroundImage: `url('${item.image}')` }} className={`w-full ${item.imageHeight || item.height} bg-contain bg-center bg-no-repeat`}>&nbsp;</div>
        <div className="text-center">{item.label}</div>
      </div>
    ))}
  </div>;
}