import { MockBff } from "./mock-bff";
import { Bff } from "./bff";

class Given {
  readonly mockBff: MockBff; // for server api calls
  readonly bff: Bff; // for client api calls

  constructor() {
    this.mockBff = new MockBff();
    this.bff = new Bff();
  }

  withMockBff(fn: (mockBff: MockBff) => void) {
    fn(this.mockBff);
    return this;
  }

  withBff(fn: (bff: Bff) => void) {
    fn(this.bff);
    return this;
  }
}

export const given = () => {
  return new Given();
};
