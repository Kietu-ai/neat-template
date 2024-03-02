import { ControllableEntity } from "./controllableEntity";

class Bird implements ControllableEntity {
  evaluateFitness(): void {
    throw new Error("Method not implemented.");
  }
}
