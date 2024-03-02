import { ControllableEntity } from "./controllableEntity";
import { Genome } from "./genome";

export class Bird implements ControllableEntity {
  private score: number;
  private genome: Genome<Bird> | null;

  constructor() {
    this.score = 0;
    this.genome = null;
  }

  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {
    this.score++;
  }
}
