import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({ icon, label }: { icon: IconDefinition, label?: string }) => {
  return <div className="flex gap-2 items-center">
    <div className="text-3xl">
      <FontAwesomeIcon icon={icon} />
    </div>
    {label && <div className="text-lg">
      {label}
    </div>}
  </div>;
}