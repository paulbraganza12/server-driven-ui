import { InputComponent } from "@/app/domain/ui/config-types";
import { cn } from "@/app/lib/util";

type Props = {
  component: InputComponent;
  onChange?: (value: string) => void;
};

export const InputRenderer = ({ component, onChange }: Props) => {
  const { id, placeholder, defaultValue, required, className, ariaLabel, validation } = component;

  // Generate unique IDs for accessibility
  const inputId = `input-${id}`;

  // Base classes for the container
  const containerClasses = cn("space-y-1", className);

  // Base classes for the input
  const inputClasses = cn(
    "block w-full rounded-md border px-3 py-2 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
  );

  return (
    <div className={containerClasses}>
      <input
        id={inputId}
        name={id}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className={inputClasses}
        aria-label={ariaLabel}
        onChange={(e) => onChange?.(e.target.value)}
        minLength={validation?.minLength}
        maxLength={validation?.maxLength}
      />
    </div>
  );
};
