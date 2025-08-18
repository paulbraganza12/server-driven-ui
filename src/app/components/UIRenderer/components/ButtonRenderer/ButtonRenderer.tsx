import { ButtonComponent } from "@/app/domain/ui/config-types";
import { cn } from "@/app/lib/util";

type Props = {
  component: ButtonComponent;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonRenderer = ({ component, onClick }: Props) => {
  const { id, text, className, ariaLabel, disabled, action } = component;

  const buttonId = `button-${id}`;

  const buttonType =
    action === "submit" ? "submit"
    : action === "reset" ? "reset"
    : "button";

  const buttonClasses = cn(
    "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium",
    className,
  );

  return (
    <button
      id={buttonId}
      className={buttonClasses}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      type={buttonType}
    >
      {text}
    </button>
  );
};
