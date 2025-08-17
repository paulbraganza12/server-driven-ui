import { TextComponent } from "@/app/domain/ui/config-types";
import { cn } from "@/app/lib/util";

type Props = {
  component: TextComponent;
};

export const TextRenderer = ({ component }: Props) => {
  const { content, className, ...attributes } = component;

  return (
    <div className={cn("text-sm text-gray-900", className)} {...attributes}>
      {content}
    </div>
  );
};
