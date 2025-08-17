"use client";

import { useState } from "react";
import { ConfigResponse, UIComponent } from "../../domain/ui";
import { uiConfigService } from "@/app/services/http-ui-config-service";
import { Retry } from "../Retry";
import { Loading } from "../Loading";
import { ComponentFactory } from "./component.factory";

type Props = {
  initialConfigResponse: ConfigResponse;
};

export const UIRenderer = ({ initialConfigResponse }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [configResponse, setConfigResponse] = useState<ConfigResponse>(initialConfigResponse);

  const handleRetry = async () => {
    setIsLoading(true);
    const config = await uiConfigService.getConfig();
    setConfigResponse(config);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!configResponse.success) {
    return (
      <Retry
        handleRetry={handleRetry}
        title={configResponse.error?.code}
        message={configResponse.error?.message}
      />
    );
  }

  return (
    <div data-testid="ui-renderer" className="space-y-6 p-6">
      {configResponse.data?.components.map(
        (component: UIComponent) => ComponentFactory.createComponent(component) as React.ReactNode,
      )}
    </div>
  );
};
