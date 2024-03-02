import { Genome } from "./genome";

export interface ControllableEntity {
  evaluateFitness(): number;
  predict(genome: Genome<any>, inputs?: number[]): void;
}
