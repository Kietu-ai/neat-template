import { ControllableEntity } from "./controllableEntity";
import { Genome } from "./genome";

export class Bird implements ControllableEntity {
  private score: number;
  private genome: Genome<Bird>;

  constructor(genome: Genome<Bird>) {
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
