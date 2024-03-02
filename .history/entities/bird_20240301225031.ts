import { ControllableEntity } from "./controllableEntity";
import { Genome } from "./genome";

export class PLayer extends Genome {
  private score: number;

  constructor() {
    this.score = 0;
    this.genome = this.genome = genome;
  }

  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {
    this.score++;
  }

  predict(inputs: []): Float32Array | Int32Array | Uint8Array {
    return this.genome.getPrediction(inputs);
  }
}
