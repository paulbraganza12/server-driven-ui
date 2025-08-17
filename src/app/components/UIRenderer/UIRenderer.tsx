import { ConfigResponse } from "../../domain/ui";

type Props = {
  configResponse: ConfigResponse;
};

export const UIRenderer = ({ configResponse }: Props) => {
  return <div data-testid="ui-renderer">UIRenderer</div>;
};
