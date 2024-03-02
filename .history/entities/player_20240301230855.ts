import { Genome } from "./genome";
import { NeuralNetwork } from "./neuralNetwork";

export class Player extends Genome {
  private score: number;
  constructor(brain: NeuralNetwork) {
    super(brain);
    this.score = score;
  }
  evaluateFitness(): number {
    throw new Error("Method not implemented.");
  }
}
