import { FormComponent } from "@/app/domain/ui";
import { ComponentFactory } from "../UIRenderer/component.factory";

type Props = {
  components: FormComponent;
};

export const FormRenderer = ({ components }: Props) => {
  const { children, id, className, ...attributes } = components;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <form id={id} className={className} onSubmit={handleSubmit} {...attributes}>
      {children.map((child) => ComponentFactory.createComponent(child))}
    </form>
  );
};
