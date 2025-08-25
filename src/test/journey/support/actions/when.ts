import { ComponentScreenRobot } from "./component-screen";

const url = "http://localhost:3000";

class When {
  launchApp(fn: (componentScreenRobot: ComponentScreenRobot) => void): When {
    cy.visit(url);
    fn(new ComponentScreenRobot());
    return this;
  }
}

export const when = () => {
  return new When();
};
