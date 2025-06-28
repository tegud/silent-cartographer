import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({ icon, label, onClick, disabled = false }: { icon: IconDefinition, label?: string, onClick?: () => void, disabled?: boolean }) => {
  return <div
    className={`flex gap-2 items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={disabled ? undefined : onClick  }>
    <div className="text-3xl">
      <FontAwesomeIcon icon={icon} />
    </div>
    {label && <div className="text-lg">
      {label}
    </div>}
  </div>;
}