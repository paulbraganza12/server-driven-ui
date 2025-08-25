import { ComponentScreenAssertions } from "./component-screen-assertions";

class Then {
  onComponentScreen(fn: (screen: ComponentScreenAssertions) => void) {
    fn(new ComponentScreenAssertions());
    return this;
  }
}

export const then = () => {
  return new Then();
};
