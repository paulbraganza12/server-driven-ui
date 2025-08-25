import { UIConfiguration } from "@/app/domain/ui/config-types";
import { registerInterceptor } from "../cypress";
import { getConfigSuccess } from "./bff-responses";

export class Bff {
  public respondsWithConfigSuccess(config: UIConfiguration) {
    registerInterceptor(getConfigSuccess(config));
  }
}
