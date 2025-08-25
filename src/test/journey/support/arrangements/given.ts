import { MockBff } from "./mock-bff";

class Given {
  readonly mockBff: MockBff;

  constructor() {
    this.mockBff = new MockBff();
  }

  withMockBff(fn: (mockBff: MockBff) => void) {
    fn(this.mockBff);
    return this;
  }
}

export const given = () => {
  return new Given();
};
