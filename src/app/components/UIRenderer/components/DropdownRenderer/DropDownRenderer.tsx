import { DropdownComponent } from "@/app/domain/ui/config-types";
import { cn } from "@/app/lib/util";
import { ChangeEvent } from "react";

type Props = {
  component: DropdownComponent;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const DropdownRenderer = ({ component, onChange }: Props) => {
  const {
    id,
    options,
    defaultValue,
    placeholder,
    className,
    ariaLabel,
    required,
    type: _componentType,
    ...attributes
  } = component;

  const selectId = `select-${id}`;

  // Base classes for the container
  const containerClasses = cn("space-y-1", className);

  const selectClasses = cn("w-full rounded-md border px-3 py-2 text-sm", className);

  return (
    <div className={containerClasses} data-testid="dropdown-container">
      <div className="relative">
        <select
          id={selectId}
          defaultValue={defaultValue || ""}
          required={required}
          aria-label={ariaLabel}
          className={selectClasses}
          onChange={onChange}
          {...attributes}
        >
          {/* Default/placeholder option */}
          <option value="" disabled hidden>
            {placeholder || "Select an option..."}
          </option>

          {/* Render all options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
