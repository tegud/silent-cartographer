interface KeyItem {
  image: string;
  label: string;
  width: string;
  height: string;
}

export const MapKey = () => {
  const images: KeyItem[] = [
    { image: "/large-ruin.png", label: "Large Ruin", width: "w-1/4", height: "h-20"},
    { image: "/medium-ruin.png", label: "Small Ruin", width: "w-1/4", height: "h-20" },
    { image: "/cargo-container.png", label: "Cargo Container", width: "w-1/4", height: "h-20" },
    { image: "/prototype-ruin.png", label: "Prototype Ruin", width: "w-1/4", height: "h-20" }
  ];
  return <div className="h-32 flex items-bottom gap-3 w-full">
    {images.map((item, index) => (
      <div key={index} className={`flex flex-col items-center ${item.width}`}>
        <div style={{ backgroundImage: `url('${item.image}')` }} className={`w-full ${item.height} bg-contain bg-center bg-no-repeat`}>&nbsp;</div>
        <div className="text-center">{item.label}</div>
      </div>
    ))}
  </div>;
}