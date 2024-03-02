import { ControllableEntity } from "./controllableEntity";
import { Genome } from "./genome";

export class Bird implements ControllableEntity {
  private score: number;
  private genome: Genome<Bird> | null;

  constructor(genome: Genome<Bird>) {
    this.score = 0;
    this.genome = this.genome = genome;
  }
  predict(): [] {
    throw new Error("Method not implemented.");
  }

  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {
    this.score++;
  }
}
