import { UIRenderer } from "./components/UIRenderer";
import { uiConfigService } from "./services/http-ui-config-service";

export default async function Home() {
  const config = await uiConfigService.getConfig();

  return <UIRenderer initialConfigResponse={config} />;
}
