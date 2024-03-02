import { Genome } from "./genome";

export interface ControllableEntity {
  evaluateFitness(): number;
  predict(inputs: []);
}
