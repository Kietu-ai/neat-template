import { Genome } from "./genome";

export interface ControllableEntity {
  evaluateFitness(): number;
  predict(inputs: []): Float32Array | Int32Array | Uint8Array;
}
