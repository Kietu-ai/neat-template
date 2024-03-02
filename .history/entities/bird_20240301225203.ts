import { ControllableEntity } from "./controllableEntity";
import { Genome } from "./genome";
import { NeuralNetwork } from "./neuralNetwork";

export class Player extends Genome {
  private score: number;

  constructor(brain: NeuralNetwork) {
    super(brain);
    this.score = 0;
  }

  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {
    this.score++;
  }
}
