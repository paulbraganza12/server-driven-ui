import { FormComponent } from "@/app/domain/ui";
import { ComponentFactory } from "../../component.factory";
import { uiConfigService } from "@/app/services";

type Props = {
  component: FormComponent;
};

export const FormRenderer = ({ component }: Props) => {
  const { children, id, className, submitUrl, method = "POST", ...attributes } = component;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!submitUrl) {
      console.warn("No submit URL provided for form");
      return;
    }

    // TODO: Add validation for the form data

    try {
      const response = await uiConfigService.submitForm(data, submitUrl, method);

      if (!response.success) {
        throw new Error("Failed to submit form");
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id={id} className={className} onSubmit={handleSubmit} {...attributes}>
      {children.map((child) => ComponentFactory.createComponent(child))}
    </form>
  );
};
